"use client";
import { useEffect, useState } from "react";
import { TransactionType } from "@/types/transactionType";
import { getOnRampTransactions } from "@/app/lib/actions/onRampTransactions";
import Transactions from "@/components/Transactions";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getOnRampTransactions();
        if (response.success && response.data) {
          setTransactions(response.data);
        } else {
          console.error('Failed to fetch transactions:', response.message);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    
    fetchTransactions();
  }, []);

  return (
    <Transactions transactions={transactions} />
  );
}
