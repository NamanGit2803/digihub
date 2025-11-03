"use client"

import { useState } from "react"
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

const QrCodePayment = ({ product }) => {
    const { userStore } = useStore()
    const [open, setOpen] = useState(false)
    const [qrValue, setQrValue] = useState("")
    const [loading, setLoading] = useState(false)

    const handleBuyNow = async () => {
        if (!userStore.user || !userStore.token) {
            userStore.openAuthModal()
            return
        }

        setLoading(true)
        try {
            const res = await fetch("/api/payment/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: product.id,
                    userId: userStore.user.email,
                    amount: product.price.toString(),
                }),
            })

            const data = await res.json()
            const order = data.order

            // ✅ Razorpay UPI deep link format
            const upiLink = `upi://pay?pa=6350250055@ptaxis&pn&pn=${encodeURIComponent(
                "Digital Store"
            )}&am=${product.price}&cu=INR&tn=${encodeURIComponent(
                product.title
            )}&tr=${order.id}`

            setQrValue(upiLink)
            setOpen(true)
        } catch (err) {
            console.error("Payment init failed:", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Button onClick={handleBuyNow} disabled={loading}>
                {loading ? "Generating QR..." : "Buy Now"}
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="flex flex-col items-center space-y-4">
                    <DialogHeader>
                        <DialogTitle>Scan to Pay</DialogTitle>
                    </DialogHeader>

                    {qrValue && (
                        <>
                            <QRCodeCanvas value={qrValue} size={200} includeMargin />
                            <p className="text-sm text-gray-600 text-center">
                                Scan this QR to pay ₹{product.price}
                            </p>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default observer(QrCodePayment)
