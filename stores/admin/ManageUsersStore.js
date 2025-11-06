"use client"
import { makeAutoObservable, runInAction } from "mobx"

class ManageUsersStore {
    allUsers = []
    loading = false
    error = null

    constructor() {
        makeAutoObservable(this)
    }

    //  Fetch all users (admin-only)
    async fetchAllUsers() {
        this.loading = true
        this.error = null

        try {
            const res = await fetch("/api/admin/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error || "Failed to fetch users")

            runInAction(() => {
                this.allUsers = data
            })
        } catch (err) {
            runInAction(() => {
                this.error = err.message
            })
            console.error("Fetch users failed:", err)
        } finally {
            runInAction(() => {
                this.loading = false
            })
        }
    }

    //  Delete user (admin-only)
    // Inside ManageUsersStore
    async deleteUser(userId) {

        try {
            const res = await fetch("/api/admin/users", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: userId }),
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error || "Failed to delete user")

            runInAction(() => {
                this.allUsers = this.allUsers.filter((user) => user.email !== userId)
            })
        } catch (err) {
            runInAction(() => {
                this.error = err.message
            })
            console.error("Delete user failed:", err)
        }
    }

}

export const manageUsersStore = new ManageUsersStore()
