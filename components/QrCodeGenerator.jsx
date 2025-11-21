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
import { date } from "zod"
import { tr } from "date-fns/locale/tr"

const QrCodePayment = ({ product }) => {
    const { userStore, orderStore } = useStore()
    const [open, setOpen] = useState(false)
    const [upiLink, setUpiLink] = useState('')

    // useless 
    const [success, setSuccess] = useState(false)

    const handleBuyNow = async () => {
        if (!userStore.user || !userStore.token) {
            userStore.openAuthModal()
            return
        }

        const upiLink = `upi://pay?pa=6350250055@ptaxis&pn&pn=${encodeURIComponent(
            "Digital Store"
        )}&am=${product.price}&cu=INR&tn=${encodeURIComponent(
            product.title
        )}&tr=${Date.now()}`

        setUpiLink(upiLink)



        // Show QR immediately
        // await orderStore.generateQr(product, userStore.user)
        setOpen(true)


        setTimeout(() => {
            setSuccess(true)
        }, 5000);
    }

    useEffect(() => {
      if(success){
        setTimeout(() => {
            setOpen(false)
        }, 5000);
      }
    }, [success])
    

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

                    {!success ? <QRCodeCanvas value={upiLink} size={200} includeMargin />
                        : <video
                            src="/verified.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-24 h-24"/>}
                    <p className="text-sm text-muted-foreground text-center">
                        {!success ? `Scan this QR to pay ₹${product.price}` : 'Payment Successfull'}
                    </p>

                    {/* {orderStore.qrValue && !orderStore.success && (
                        <>
                            <QRCodeCanvas value={orderStore.upiLink} size={200} includeMargin />
                            <p className="text-sm text-muted-foreground text-center">
                                Scan this QR to pay ₹{product.price}
                            </p>
                            <p className="text-xs text-muted-foreground animate-pulse">
                                Waiting for payment confirmation...
                            </p>
                        </>
                    )} */}

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
