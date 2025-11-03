"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { observer } from "mobx-react-lite"
import { useStore } from '../../../stores/StoreProvider'
import { useState, useEffect } from "react"

const ProfileHeader = () => {

  const { userStore } = useStore()
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []); // ensures render only on client

  if (!isClient) return null;

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=profile" alt="Profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-1">{userStore.user?.name}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(ProfileHeader)
