"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../components/ui/button"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, CircleAlert, CheckCircle } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useStore } from '../stores/StoreProvider'
import { toast } from "sonner"


const AuthModal = () => {

  const { userStore } = useStore()

  const [isLogin, setIsLogin] = useState(true)
  const [open, setOpen] = useState(false) // ✅ control dialog manually
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  })

  // handle change 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // on submit 
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isLogin) {
      await userStore.login({
        email: formData.email,
        password: formData.password,
      })
    } else {
      await userStore.register(formData)
    }

    if (userStore.user) {
      if (userStore.user.role === 'admin') {
        setFormData({
          name: "",
          email: "",
          password: "",
          mobile: "",
        })

        toast(
          <div className="flex gap-2 items-center">
            <CheckCircle className="text-green-600 w-4 h-4" />
            <span>
              {"Logged in as admin successfully!"}
            </span>
          </div>
        )

        router.push('/admin')

      } else {
        toast(
          <div className="flex gap-2 items-center">
            <CheckCircle className="text-green-600 w-4 h-4" />
            <span>
              {isLogin ? "Logged in successfully!" : "Registered successfully!"}
            </span>
          </div>
        )


        setFormData({
          name: "",
          email: "",
          password: "",
          mobile: "",
        })
        router.push("/")
      }
    } else if (userStore.error) {
      toast(
        <div className="flex gap-2 items-center">
          <CircleAlert className="text-red-600 w-4 h-4" />
          <span>{userStore.error}</span>
        </div>
      )
    }
  }


  return (
    <Dialog open={userStore.authModelOpen} onOpenChange={(isOpen) => {

      isOpen ? userStore.openAuthModal() : userStore.closeAuthModal()

      // reset form when dialog closes
      if (!isOpen) {
        setFormData({
          name: "",
          email: "",
          password: "",
          mobile: "",
        })
        setIsLogin(true)
      }
    }}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="hover:cursor-pointer"
          onClick={() => userStore.openAuthModal()}
        >
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isForgotPassword
              ? "Reset Password"
              : isLogin
                ? "Login"
                : "Register"}
          </DialogTitle>
          <DialogDescription>
            {isForgotPassword
              ? "Enter your email to receive password reset instructions."
              : isLogin
                ? "Let’s pick up where you left off."
                : "Start your experience today."}
          </DialogDescription>
        </DialogHeader>

        <div className="bg-card rounded-lg p-8 max-w-md w-full mx-4">
          {/* ✅ Forgot Password Form */}
          {isForgotPassword ? (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                toast(
                  <div className="flex gap-2 items-center">
                    <CheckCircle className="text-green-600 w-4 h-4" />
                    <span>Password reset link sent to your email.</span>
                  </div>
                )
                setIsForgotPassword(false)
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <button
                type="button"
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition font-medium"
              >
                Send Reset Link
              </button>

              <p className="text-sm text-center text-muted-foreground">
                Remembered your password?{" "}
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="text-primary hover:underline"
                >
                  Back to Login
                </button>
              </p>
            </form>
          ) : (
            /* ✅ Normal Login/Register Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mobile</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 bottom-0 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition font-medium"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>
          )}

          {/* ✅ Links Below Form */}
          {!isForgotPassword && (
            <div className="mt-4 text-center">
              {isLogin && (
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              )}

              <p className="text-muted-foreground text-sm mt-2">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline font-medium"
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </p>
            </div>
          )}
        </div>
      </DialogContent>

    </Dialog>
  )
}


export default observer(AuthModal)