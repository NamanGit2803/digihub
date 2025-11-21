'use client'

import { makeAutoObservable, runInAction } from "mobx"
import Razorpay from "razorpay";

class OrderStore {
    orders = []
    loading = false
    downloading = false
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


    // fetch all order by user 
    async fetchAllOrdersForUser(userId) {
        this.loading = true
        this.error = null
        try {
            const res = await fetch("/api/orders/fetchOrders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });
            if (!res.ok) throw new Error("Failed to fetch products")

            const data = await res.json()
            runInAction(() => {
                this.orders = data
                this.loading = false
            })
        } catch (err) {
            runInAction(() => {
                this.error = err.message
                this.loading = false
            })
        }
    }


    // download file
    async downloadFile(orderId, userId) {
        this.downloading = true
        this.error = null

        try {

            const res = await fetch("/api/download", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId, userId }),
            });

            // If server says error
            if (!res.ok && !res.redirected) {
                throw new Error("Download failed");
            }

            const data = await res.json()

            // FORCE DOWNLOAD
            const a = document.createElement("a");
            a.href = data.fileUrl;
            a.download = "";  // browser will download instead of open
            a.click();
            runInAction(() => {
                this.downloading = false;
            });
        } catch (err) {
            runInAction(() => {
                this.error = err.message;
                this.downloading = false;
            });
        }
    }


    //   qr code generate 
    async generateQr(product, user) {
        this.loading = true
        try {
            // const res = await fetch("/api/payment/generateQr", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //         amount: product.price,
            //         userId: user.email,
            //         productId: product.id,
            //         productTitle: product.title,
            //     }),
            // })

            // const data = await res.json()
            // if (!res.ok) throw new Error(data.error || "QR creation failed")

            // runInAction(() => {
            //     this.upiLink = data.upiLink
            //     this.orderId = data.orderId
            //     this.status = "created"
            // })

            // this.pollPaymentStatus()
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
