"use client";
import { getBalance } from "@/app/lib/actions/getBalance";
import { CreateOnRampTransactions } from "@/app/lib/actions/onRampTransactions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  SelectTrigger,
  Separator,
  Select,
  SelectValue,
  SelectItem,
  SelectContent,
  Button,
} from "@repo/ui";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [balance, setBalance] = useState(0);
  const [lockedBalance, setLockedBalance] = useState(0);

  const supportedBanks: { bank: string; website: string }[] = [
    {
      bank: "HDFC",
      website: "https://netbanking.hdfcbank.com/netbanking/",
    },
    {
      bank: "Axis",
      website: "https://nbpg.axisbank.co.in/axispaymentgateway/#/",
    },
    {
      bank: "ICICI",
      website:
        "https://www.icicibank.com/personal-banking/online-services/payment-gateway",
    },
  ];

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await getBalance();
        if (response.success && response.data) {
          setBalance(response.data.amount / 100);
          setLockedBalance(response.data.locked / 100);
        } else {
          console.error("Failed to fetch balance:", response.error);
          toast.error("Failed to fetch balance");
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
        toast.error("Error fetching balance");
      }
    };
    fetchBalance();
  }, []);

  const onClickHandler = async () => {
    console.log("amount", amount);
    const response = await CreateOnRampTransactions(amount * 100, provider);
    console.log("response status ", response.message);
    if (response.success) {
      toast.success("transaction initiated");
      window.location.href = redirectUrl;
    } else {
      toast.error("Transaction failed.");
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">Transfer</h1>
        {/* Desktop header info */}
      </div>

      {/* Two main sections side by side */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        {/* Add Money Card */}
        <div className="flex-1">
          <Card className="bg-black-100 text-black/60">
            <CardHeader className="pb-4">
              <CardTitle className="text-black">Add Money</CardTitle>
              <Separator className="bg-gray-200" />
            </CardHeader>
            <CardContent className="flex flex-col gap-6 h-full">
              <div className="flex flex-col gap-3">
                <label className="font-medium text-sm">Amount</label>
                <Input
                  placeholder="Enter amount"
                  type="number"
                  className="bg-white text-gray-900 border-gray-300"
                  min={1}
                  value={amount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAmount(parseInt(e.target.value));
                  }}
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-medium text-sm">Bank</label>
                <Select
                  value={provider}
                  onValueChange={(value: string) => {
                    setProvider(value);
                    setRedirectUrl(
                      supportedBanks.find((bank) => bank.bank === value)
                        ?.website ?? "",
                    );
                  }}
                >
                  <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                    <SelectValue placeholder="Select Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedBanks.map((bank) => {
                      return (
                        <SelectItem key={bank.bank} value={bank.bank}>
                          {bank.bank}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-auto pt-4">
                <Button
                  onClick={onClickHandler}
                  className="bg-blue-600 hover:bg-blue-700 text-black w-full py-2.5 cursor-pointer"
                >
                  Add Money
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Balance Card */}
        <div className="flex-1">
          <Card className="bg-black-100 text-black/60">
            <CardHeader className="pb-4">
              <CardTitle className="text-black">Balance</CardTitle>
              <Separator className="bg-gray-200" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4 h-full">
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <span className="text-gray-700 font-medium">
                    Unlocked Balance
                  </span>
                  <span className="text-green-600 font-bold text-lg">
                    ₹{balance}{" "}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <span className="text-gray-700 font-medium">
                    Locked Balance
                  </span>
                  <span className="text-orange-600 font-bold text-lg">
                    ₹{lockedBalance}
                  </span>
                </div>

                <Separator className="bg-gray-200" />

                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-gray-700 font-semibold">
                    Total Balance
                  </span>
                  <span className="text-blue-600 font-bold text-xl">
                    ₹{balance + lockedBalance}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
