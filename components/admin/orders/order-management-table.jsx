"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"
import { OrderDetailDialog } from "@/components/admin/orders/order-detail-dialog"

const mockOrders = [
    {
        id: "1",
        orderNumber: "#ORD-2024-001",
        customer: "John Doe",
        date: "2024-11-03",
        total: 234.5,
        items: 3,
        status: "delivered",
    },
    {
        id: "2",
        orderNumber: "#ORD-2024-002",
        customer: "Jane Smith",
        date: "2024-11-03",
        total: 156.0,
        items: 2,
        status: "shipped",
    },
    {
        id: "3",
        orderNumber: "#ORD-2024-003",
        customer: "Bob Johnson",
        date: "2024-11-02",
        total: 89.99,
        items: 1,
        status: "processing",
    },
    {
        id: "4",
        orderNumber: "#ORD-2024-004",
        customer: "Alice Williams",
        date: "2024-11-02",
        total: 567.5,
        items: 5,
        status: "pending",
    },
    {
        id: "5",
        orderNumber: "#ORD-2024-005",
        customer: "Charlie Brown",
        date: "2024-11-01",
        total: 432.1,
        items: 4,
        status: "delivered",
    },
    {
        id: "6",
        orderNumber: "#ORD-2024-006",
        customer: "Diana Prince",
        date: "2024-11-01",
        total: 123.45,
        items: 2,
        status: "cancelled",
    },
]

export function OrderManagementTable({ searchTerm = "", statusFilter = "all" }) {
    const [orders] = useState(mockOrders)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const filtered = orders.filter((order) => {
        const matchesSearch =
            order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const handleViewOrder = (order) => {
        setSelectedOrder(order)
        setIsDialogOpen(true)
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order Id</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filtered.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.orderNumber}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {selectedOrder && (
                <OrderDetailDialog order={selectedOrder} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            )}
        </>
    )
}
