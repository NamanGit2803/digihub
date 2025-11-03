'use client'

import { makeAutoObservable, runInAction } from "mobx"
import { toJS } from "mobx"

class UserStore {
    user = null
    token = null
    error = null
    loading = false
    authModelOpen = false

    constructor() {
        makeAutoObservable(this)
        this.loadFromStorage()
    }

    openAuthModal() {
        console.log('hiii')
        this.authModelOpen = true
    }

    closeAuthModal() {
        this.authModelOpen = false
    }

    toggleAuthModal() {
        this.authModelOpen = !this.authModelOpen
    }

    //  Load token (and maybe user) on startup
    loadFromStorage() {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("user")
            if (token) {
                this.token = token
                this.fetchUserProfile()
            }
        }
    }


    //  Save token and user
    setAuthData(user, token) {
        this.user = user
        this.token = token
        localStorage.setItem("user", token)
    }

    //  Login
    async login(credentials) {
        this.loading = true
        this.error = null
        try {
            const res = await fetch("/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            })
            const data = await res.json()

            if (!res.ok) throw new Error(data.error || "Login failed")

            runInAction(() => {
                this.setAuthData(data.user, data.token)
            })
        } catch (err) {
            runInAction(() => {
                this.error = err.message
            })
        } finally {
            this.loading = false
        }
    }

    //  Register
    async register(formData) {
        this.loading = true
        this.error = null
        try {
            const res = await fetch("/api/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            const data = await res.json()

            if (!res.ok) throw new Error(data.message || "Registration failed")

            runInAction(() => {
                this.setAuthData(data.user, data.token)
            })
        } catch (err) {
            runInAction(() => {
                this.error = err.message
            })
        } finally {
            this.loading = false
        }
    }

    //  Fetch logged-in user's profile using token
    async fetchUserProfile() {

        if (!this.token) return

        try {

            const res = await fetch("/api/user/findUser", {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
            const data = await res.json()

            if (res.ok) {
                console.log('hiiiiii', data)
                runInAction(() => {
                    this.user = data
                })
            }
        } catch (err) {
            console.error("Failed to fetch profile:", err)
        }
    }

    //  Logout
    logout() {
        this.user = null
        this.token = null
        localStorage.removeItem("user")
    }

    // change user info 
    async updateProfile(updates) {
        try {
            const res = await fetch("/api/user/updateUser", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
                body: JSON.stringify(updates),
            })

            const data = await res.json()

            if (res.ok) {
                runInAction(() => {
                    this.user = data.user
                })
                return "Profile updated successfully!"
            } else {
                throw new Error(data.error || "Failed to update profile")
            }
        } catch (err) {
            runInAction(() => {
                this.error = err.message
            })
        }
    }

}

export const userStore = new UserStore()
