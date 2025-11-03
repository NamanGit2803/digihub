"use client"
import { makeAutoObservable } from "mobx"

class ProductsStore {
    allProducts = []

    constructor() {
        makeAutoObservable(this)
    }

    


}

export const productsStore = new ProductsStore()
