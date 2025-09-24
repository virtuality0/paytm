import { P2PTransaction } from "@/types/p2pTransactiontype";
import { Card, CardContent, CardHeader, CardTitle, Label, Input, Button, Separator } from "@repo/ui";
import { IndianRupeeIcon } from "lucide-react";

interface TransfersComponentProps {
    userId : string;
    p2pTransactions : P2PTransaction[];
    phoneNumber : string;
    amount : number;
    setPhoneNumber : (phoneNumber : string) => void;
    setAmount : (amount : number) => void;
    handleClick : () => void;
}

export default function Transfers({userId, p2pTransactions, phoneNumber, amount, setPhoneNumber, setAmount, handleClick} : TransfersComponentProps) {
    return <div className="flex flex-col gap-4">
    <Card className="w-[75%]">
            <CardHeader>
                <CardTitle className="text-2xl">Transfers</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <Label>Phone Number</Label>
                    <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="phone number" type="number"></Input>
                </div>
                <div className="flex flex-col gap-4">
                    <Label>Amount</Label>
                    <Input value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="amount" type="number"></Input>
                </div>
                <Button onClick={handleClick} className="cursor-pointer">Transfer Money</Button>
            </CardContent>
        </Card>

        <Card className="w-[75%]">
            <CardHeader>
                <CardTitle className="text-2xl">Recent Transfers</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    {p2pTransactions.map((transaction) => {
                        return (
                            <div key={transaction.id} className="flex flex-col gap-2">
                                <div className="flex justify-between text-black py-1 rounded-lg">
                                    <div className="flex flex-col gap-1">
                                        <span>Amount</span>
                                        <span className="text-xs text-black">
                                            {new Date(transaction.timestamp).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="flex gap-1 text-sm items-center">{transaction.senderId === userId ? 'Sent' : 'Received'}</span>
                                    <span className={`${transaction.senderId === userId ? 'text-red-500' : 'text-green-500'} flex gap-1 text-sm items-center`}>
                                        <IndianRupeeIcon className="w-4" /> {transaction.amount / 100}
                                    </span>
                                    </div>
                                </div>
                                <Separator />
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    </div>
}