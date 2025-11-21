"use client"
import { makeAutoObservable, runInAction } from "mobx"

class AdminOrderStore {
    orders = []
    loading = false
    error = null

    constructor() {
        makeAutoObservable(this)
    }

    // fetch all orders 
    async fectchOrders() {
        this.loading = true
        this.error = null
        try {
            const res = await fetch("/api/admin/orders")
            if (!res.ok) throw new Error("Failed to fetch orders")

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

    // approved the download 
    async adminApproved(orderId) {
        this.loading = true
        this.error = null
        try {
            const res = await fetch(`/api/admin/orders`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderId),
            })
            if (!res.ok) throw new Error("Failed to approved!")
            const data = await res.json()

            runInAction(() => {
                this.orders = this.orders.map((o) => (o.id === orderId ? data : o))
                this.loading = false
            })
        } catch (err) {
            console.log("err", err)
            runInAction(() => {
                this.error = err.message
                this.loading = false
            })
        }
    }


}

export const adminOrderStore = new AdminOrderStore()
