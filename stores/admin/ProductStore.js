"use client"
import { makeAutoObservable, runInAction } from "mobx"

class ProductStore {
    products = []
    loading = false
    error = null

    constructor() {
        makeAutoObservable(this)
    }

    //  Fetch all products (from API or local mock)
    async fetchProducts() {
        this.loading = true
        this.error = null
        try {
            const res = await fetch("/api/admin/products")
            if (!res.ok) throw new Error("Failed to fetch products")

            const data = await res.json()
            runInAction(() => {
                this.products = data
                this.loading = false
            })
        } catch (err) {
            runInAction(() => {
                this.error = err.message
                this.loading = false
            })
        }
    }

    //  Add a new product
    async addProduct(newProduct) {
        this.loading = true
        this.error = null
        try {
            const res = await fetch("/api/admin/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            })
            if (!res.ok) throw new Error("Failed to add product")
            const data = await res.json()

            runInAction(() => {
                this.products.push(data)
                this.loading = false
            })
        } catch (err) {
            runInAction(() => {
                this.error = err.message
                this.loading = false
            })
        }
    }

    //  Delete product
    async deleteProduct(id) {
        this.loading = true
        this.error = null
        try {
            const res = await fetch("/api/admin/products", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }), 
            });

            if (!res.ok) throw new Error("Failed to delete product")

            runInAction(() => {
                this.products = this.products.filter((p) => p.id !== id)
                this.loading = false
            })
        } catch (err) {
            runInAction(() => {
                this.error = err.message
                this.loading = false
            })
        }
    }

    //  Update product
    async updateProduct(productData) {
        this.loading = true
        this.error = null
        try {
            const res = await fetch(`/api/admin/products`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            })
            if (!res.ok) throw new Error("Failed to update product")
            const data = await res.json()

            runInAction(() => {
                this.products = this.products.map((p) => (p.id === productData.id ? data : p))
                this.loading = false
            })
        } catch (err) {
            console.log("err",err)
            runInAction(() => {
                this.error = err.message
                this.loading = false
            })
        }
    }

    //  Utility: Get a single product
    getProductById(id) {
        return this.products.find((p) => p.id === id)
    }
}

export const productStore = new ProductStore()
