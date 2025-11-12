"use client"
import { makeAutoObservable, runInAction } from "mobx"

class SiteSettingStore {
    siteData = {}
    loading = false
    error = null

    constructor() {
        makeAutoObservable(this)
    }

    // fetch site details 
    async fetchData() {
        this.loading = true
        this.error = null
        try {
            const res = await fetch("/api/public/fetchSiteData")
            if (!res.ok) throw new Error("Failed to fetch data")

            const data = await res.json()
            runInAction(() => {
                this.siteData = data
                this.loading = false
            })
        } catch (err) {
            runInAction(() => {
                this.error = err.message
                this.loading = false
            })
        }
    }

    // update site data 
    async updateSiteData(updatedData) {
        this.loading = true
        this.error = null
        try {
            const res = await fetch(`/api/admin/siteSetting`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            })
            if (!res.ok) throw new Error("Failed to update site-data")
            const data = await res.json()

            runInAction(() => {
                this.siteData = data
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

export const siteSettingStore = new SiteSettingStore()
