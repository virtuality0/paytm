import AppSidebar from "@/components/AppSidebar";
import { UserButton } from "@clerk/nextjs";
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

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col grow">
        {/* Header - Only visible on mobile when sidebar is collapsed */}
        <header className="flex justify-end items-center px-4 py-3 border-b border-gray-700">
          <UserButton />
        </header>
        {/* Content */}
        <div className="flex-1 p-6 bg-black overflow-auto">
          <div className="flex flex-col gap-6 h-full">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">Transfer</h1>
              {/* Desktop header info */}
            </div>

            {/* Two main sections side by side */}
            <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
              {/* Add Money Card */}
              <div className="flex-1">
                <Card className="bg-gray-100 text-white/60">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-white">Add Money</CardTitle>
                    <Separator className="bg-gray-200" />
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6 h-full">
                    <div className="flex flex-col gap-3">
                      <label className="font-medium text-sm">Amount</label>
                      <Input
                        placeholder="Enter amount"
                        type="number"
                        className="bg-white text-gray-900 border-gray-300"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="font-medium text-sm">Bank</label>
                      <Select>
                        <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                          <SelectValue placeholder="Select Bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HDFC">HDFC Bank</SelectItem>
                          <SelectItem value="ICICI">ICICI Bank</SelectItem>
                          <SelectItem value="Axis">Axis Bank</SelectItem>
                          <SelectItem value="SBI">
                            State Bank of India
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="mt-auto pt-4">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2.5 cursor-pointer">
                        Add Money
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Balance Card */}
              <div className="flex-1">
                <Card className="bg-gray-100 text-white/60">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-white">Balance</CardTitle>
                    <Separator className="bg-gray-200" />
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 h-full">
                    <div className="flex flex-col gap-4 flex-1">
                      <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                        <span className="text-gray-700 font-medium">
                          Unlocked Balance
                        </span>
                        <span className="text-green-600 font-bold text-lg">
                          ₹0.00
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                        <span className="text-gray-700 font-medium">
                          Locked Balance
                        </span>
                        <span className="text-orange-600 font-bold text-lg">
                          ₹0.00
                        </span>
                      </div>

                      <Separator className="bg-gray-200" />

                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-gray-700 font-semibold">
                          Total Balance
                        </span>
                        <span className="text-blue-600 font-bold text-xl">
                          ₹0.00
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
