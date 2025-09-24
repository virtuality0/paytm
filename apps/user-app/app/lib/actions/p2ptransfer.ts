"use server";
import db from "@repo/db/client"
import { getCurrentUserMetadata } from "@/helpers/getCurrentUserMetadata";

export async function p2pTransfer(receiverPhone: string, amount: number) {
    const senderUserId = await getCurrentUserMetadata();
    const sender = await db.user.findUnique({
        where: {
            id: senderUserId ?? ""
        },
    })

    if (!sender) {
        return {
            message: "user not found",
            success: false
        }
    }

    const receiver = await db.user.findUnique({
        where: {
            number: receiverPhone
        }
    })

    if (!receiver) {
        return {
            message: "receiver not found",
            success: false
        }
    }   

    await db.$transaction(async (transaction) => {
        // locking the row until one transaction is completed in case there are multiple transactions for the same user
        await transaction.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${sender.id} FOR UPDATE`

        const senderBalance = await transaction.balance.findFirst({
            where: {
                userId: sender.id
            }
        })

        if (!senderBalance || senderBalance.amount < (amount * 100)) {
            throw new Error('Insufficient balance')
        }

        // deducting from sender account 
        await transaction.balance.update({
            where: {
                userId: sender.id
            },
            data: {
                amount: {
                    decrement: amount * 100
                }
            }
        })

        // adding to receiver account
        await transaction.balance.update({
            where: {
                userId: receiver.id
            },
            data: {
                amount: {
                    increment: amount * 100
                }
            }
        })

        await transaction.p2PTransactions.create({
            data: {
                amount: amount * 100,
                senderId: sender.id,
                receiverId: receiver.id,
            }
        })
    })

    return {
        message: "transfer successful",
        success: true
    }
}

export async function getP2PTransfers(){
    const userId = await getCurrentUserMetadata()
    try {
        const user = await db.user.findFirst({
            where : {
                id : userId ?? ""
            },
            include : {
                receivedTransfers : {
                    orderBy: {
                        timestamp: 'desc'
                    }
                }, 
                sentTransfers : {
                    orderBy: {
                        timestamp: 'desc'
                    }
                }
            }
        })

        if(!user){
            return {
                success : false, 
                message : 'User not found'
            }
        }

        return {
            success : true, 
            transfers : user.receivedTransfers.concat(user.sentTransfers).sort((a, b) => 
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            ),
            userId : user.id
        }
    }
    catch(err){
        return {
            success : false, 
            error : err
        }
    }
}