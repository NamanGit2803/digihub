import { makeAutoObservable, runInAction } from "mobx"
import Razorpay from "razorpay";

class OrderStore {
    loading = false
    error = null
    order = null
    verified = false
    qrData = null
    upiLink = ""
    orderId = ""
    status = "idle" // idle | created | paid

    constructor() {
        makeAutoObservable(this)
    }


    //   qr code generate 
    async generateQr(product, user) {
        this.loading = true
        try {
            const res = await fetch("/api/payment/generateQr", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: product.price,
                    userId: user.email,
                    productId: product.id,
                    productTitle: product.title,
                }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "QR creation failed")

            runInAction(() => {
                this.upiLink = data.upiLink
                this.orderId = data.orderId
                this.status = "created"
            })

            this.pollPaymentStatus()
        } catch (err) {
            runInAction(() => {
                this.error = err.message
                this.loading = false
            })
        } finally {
            runInAction(() => {
                this.loading = false
            })
        }
    }

    // verify the payment 
    async pollPaymentStatus() {
        const interval = setInterval(async () => {
            if (!this.orderId) return
            try {
                const res = await fetch("/api/payment/status", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId: this.orderId }),
                })

                const data = await res.json()
                if (data.status === "paid") {
                    clearInterval(interval)
                    runInAction(() => {
                        this.status = "paid"
                    })
                    // toast.success("Payment verified ✅")
                }
            } catch (err) {
                runInAction(() => {
                    this.error = err.message
                    this.loading = false
                })
            }
        }, 5000)
    }

    reset() {
        this.upiLink = ""
        this.orderId = ""
        this.status = "idle"
    }
}

export const orderStore = new OrderStore()
