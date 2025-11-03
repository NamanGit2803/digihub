"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function OrderDetailDialog({ order, open, onOpenChange }) {
    const mockItems = [
        { name: "Wireless Mouse", qty: 1, price: 29.99 },
        { name: "USB-C Cable", qty: 2, price: 12.99 },
    ]

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{order.orderNumber}</DialogTitle>
                    <DialogDescription>Order details and information</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-sm text-muted-foreground">Order Date</p>
                                <p className="text-lg font-semibold">{order.date}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-sm text-muted-foreground">Status</p>
                                <Badge className="mt-2">{order.status}</Badge>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Customer</p>
                                <p className="text-lg font-semibold">{order.customer}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="font-semibold mb-4">Order Items</h3>
                            <div className="space-y-2">
                                {mockItems.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span>
                                            {item.name} x {item.qty}
                                        </span>
                                        <span>${(item.price * item.qty).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <Separator className="my-4" />
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    )
}

