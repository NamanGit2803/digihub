"use client"
import { makeAutoObservable, runInAction } from "mobx"

class CategoryStore {
    categories = []
    loading = false
    error = null

    constructor() {
        makeAutoObservable(this)
    }


    //  Add a new category
    async addCategory(newCategory) {
        this.loading = true
        this.error = null
        try {
            const res = await fetch("/api/admin/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCategory),
            })
            if (!res.ok) throw new Error("Failed to add category")
            const data = await res.json()

            runInAction(() => {
                this.categories.push(data)
                this.loading = false
            })
        } catch (err) {
            runInAction(() => {
                this.error = err.message
                this.loading = false
            })
        }
    }

    //  Fetch all categories 
    async fetchCategories() {
        this.loading = true
        this.error = null
        try {
            const res = await fetch("/api/admin/categories")
            if (!res.ok) throw new Error("Failed to fetch categories")

            const data = await res.json()
            runInAction(() => {
                this.categories = data
                this.loading = false
            })
        } catch (err) {
            runInAction(() => {
                this.error = err.message
                this.loading = false
            })
        }
    }


    //  Delete category
    async deleteCategory(id) {
        this.loading = true
        this.error = null
        try {
            const res = await fetch("/api/admin/categories", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) throw new Error("Failed to delete category")

            runInAction(() => {
                this.categories = this.categories.filter((p) => p.id !== id)
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
    async updateCategory(categoryData) {
        this.loading = true
        this.error = null
        try {
            const res = await fetch(`/api/admin/categories`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(categoryData),
            })
            if (!res.ok) throw new Error("Failed to update category")
            const data = await res.json()

            runInAction(() => {
                this.categories = this.categories.map((p) => (p.id === categoryData.id ? data : p))
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

export const categoryStore = new CategoryStore()
