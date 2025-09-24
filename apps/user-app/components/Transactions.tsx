import { Card, CardContent, CardTitle, Separator } from "@repo/ui";
import { TransactionType } from "@/types/transactionType";
import { IndianRupeeIcon } from "lucide-react";

interface TransactionsProps {
  transactions: TransactionType[];
}

export default function Transactions({ transactions }: TransactionsProps) {
  return (
    <Card className="w-[75%] bg-black-100 px-4 py-2">
      <CardTitle className="text-black font-bold text-xl">
        Recent Transactions
        <Separator />
      </CardTitle>
      <CardContent>
        {transactions?.map((transaction) => {
          return (
            <div key={transaction.id} className="flex flex-col gap-2">
              <div className="flex justify-between text-black py-1 rounded-lg">
                <div className="flex flex-col gap-1">
                  <span>Amount</span>
                  <span className="text-xs text-black">
                    {new Date(transaction.startTime).toLocaleDateString()}
                  </span>
                </div>
                <span className="flex gap-1 text-sm items-center">
                  <IndianRupeeIcon className="w-4" /> {transaction.amount / 100}
                </span>
              </div>
              <Separator />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
