"use client"
import { getP2PTransfers, p2pTransfer } from "@/app/lib/actions/p2ptransfer";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Transfers from "@/components/Transfers";
import { P2PTransaction } from "@/types/p2pTransactiontype";


export default function TransfersPage() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState(0);
    const [p2pTransactions, setP2pTransactions] = useState<P2PTransaction[]>([]);
    const [userId, setUserId] = useState("");

    const handleClick = async () => {
        const response = await p2pTransfer(phoneNumber, amount);
        if(response.success){
            toast.success('Transfer successful');
            const updatedTransactions = await getP2PTransfers();
            if(updatedTransactions.success && updatedTransactions.transfers){
                setP2pTransactions(updatedTransactions.transfers);
            }
        }else{
            toast.error(response.message);
        }
        setPhoneNumber("");
        setAmount(0);
    }

    useEffect(() => {
        const fetchP2pTransactions = async () => {
            const response = await getP2PTransfers();
            if(response.success && response.transfers){
                setP2pTransactions(response.transfers);
                setUserId(response.userId);
            }else{
                toast.error(response.message || 'Failed to fetch transactions');
            }
        }
        fetchP2pTransactions();
    }, [])

    return (
        <Transfers userId={userId} p2pTransactions={p2pTransactions} phoneNumber={phoneNumber} amount={amount} setPhoneNumber={setPhoneNumber} setAmount={setAmount} handleClick={handleClick} />
    )
}