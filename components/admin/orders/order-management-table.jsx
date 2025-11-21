"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"
import { OrderDetailDialog } from "@/components/admin/orders/order-detail-dialog"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { Spinner } from "@/components/ui/spinner"


const OrderManagementTable = ({ searchTerm = "", statusFilter = "all" }) => {

    const { adminOrderStore } = useStore()

    const filtered = adminOrderStore.orders?.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user_id.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    useEffect(() => {
        adminOrderStore.fectchOrders()
    }, [])


    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order Id</TableHead>
                        <TableHead>Customer Id</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Download Allow</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filtered.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.user_id}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                            <TableCell>{order.download_allow ? 'Allowed' :
                                <Button size='sm' className='hover:cursor-pointer' disabled={adminOrderStore.loading} onClick={() => adminOrderStore.adminApproved(order.id)}>{adminOrderStore.loading && <Spinner />}Allow</Button>}
                            </TableCell>
                            <TableCell>₹{order.amount}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <OrderDetailDialog order={order} />
                                    <Button variant="ghost" size="sm">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}


export default observer(OrderManagementTable)
