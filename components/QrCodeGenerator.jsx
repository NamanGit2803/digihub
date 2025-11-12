"use client"

import { useState, useEffect } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { observer } from "mobx-react-lite"
import { useStore } from "../stores/StoreProvider"
import { ArrowRight, CheckCircle } from "lucide-react"
import { toast } from "sonner"

const QrCodePayment = ({ product }) => {
    const { userStore, orderStore } = useStore()
    const [open, setOpen] = useState(false)

    const handleBuyNow = async () => {
        if (!userStore.user || !userStore.token) {
            userStore.openAuthModal()
            return
        }

        // Show QR immediately
        await orderStore.generateQr(product, userStore.user)
        setOpen(true)
    }

    // useEffect(() => {
    //     if (!open) orderStore.reset()
    // }, [open])

    return (
        <>
            <Button
                onClick={handleBuyNow}
                disabled={orderStore.loading}
                className="hover:cursor-pointer"
            >
                {orderStore.loading ? "Generating QR..."
                    : "Buy Now"}
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="flex flex-col items-center space-y-4">
                    <DialogHeader>
                        <DialogTitle>
                            {orderStore.success
                                ? "Payment Successful!"
                                : "Scan to Pay with UPI"}
                        </DialogTitle>
                    </DialogHeader>

                    {orderStore.qrValue && !orderStore.success && (
                        <>
                            <QRCodeCanvas value={orderStore.upiLink} size={200} includeMargin />
                            <p className="text-sm text-muted-foreground text-center">
                                Scan this QR to pay ₹{product.price}
                            </p>
                            {/* <p className="text-xs text-muted-foreground animate-pulse">
                                Waiting for payment confirmation...
                            </p> */}
                        </>
                    )}

                    {orderStore.success && (
                        <p className="text-green-600 font-medium text-center">
                            Payment verified ✅ — your order has been created!
                        </p>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default observer(QrCodePayment)
