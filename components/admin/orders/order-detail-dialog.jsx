"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { useState } from "react"

export function OrderDetailDialog({ order }) {

    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                </Button>
            </DialogTrigger>

            <DialogContent
                className="
                    w-[95%] 
                    max-w-2xl 
                    max-h-[90vh] 
                    overflow-y-auto 
                    rounded-xl
                "
            >
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        Order #{order.id}
                    </DialogTitle>
                    <DialogDescription>
                        View purchased digital product details
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 mt-4 pb-6">

                    {/* ORDER BASIC INFO */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-sm text-muted-foreground">Order Date</p>
                                <p className="text-lg font-semibold wrap-break-word">
                                    {new Date(order.created_at).toLocaleString()}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-sm text-muted-foreground">Status</p>
                                <Badge className="mt-2 capitalize">
                                    {order.status}
                                </Badge>
                            </CardContent>
                        </Card>
                    </div>

                    {/* CUSTOMER INFO */}
                    <Card>
                        <CardContent className="pt-6 space-y-2">
                            <p className="text-sm text-muted-foreground">Customer ID</p>
                            <p className="text-lg font-semibold wrap-break-word">{order.user_id}</p>
                        </CardContent>
                    </Card>

                    {/* PRODUCT INFO */}
                    <Card>
                        <CardContent className="pt-6 space-y-6">
                            <div>
                            

                                <div className="mt-3 space-y-2">
                                    <p className="text-sm text-muted-foreground">Product ID</p>
                                    <p className="text-lg font-semibold wrap-break-word">{order.product_id}</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between items-center font-semibold text-lg">
                                <span>Total Amount</span>
                                <span>₹{order.amount}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* CLOSE BUTTON */}
                    <div className="flex justify-end">
                        <Button
                            variant="default"
                            className="w-full sm:w-auto"
                            onClick={() => setDialogOpen(false)}
                        >
                            Close
                        </Button>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}
