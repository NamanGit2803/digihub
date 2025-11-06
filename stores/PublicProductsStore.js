'use client'

import { makeAutoObservable, runInAction } from "mobx"
import { toJS } from "mobx"

class PublicProductsStore {
    products = []
    loading = false
    error = null


    constructor() {
        makeAutoObservable(this)
        this.fetchProducts()
    }

    //  Fetch all products
    async fetchProducts() {
        this.loading = true
        this.error = null
        try {
            const res = await fetch("/api/products/fetchProducts")
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
}


export const publicProductsStore = new PublicProductsStore()