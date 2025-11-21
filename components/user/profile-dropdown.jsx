'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {  User, CircleUserRound, UserRoundPen, LogOut } from "lucide-react"
import { useRouter } from 'next/navigation'
import { observer } from "mobx-react-lite"
import { useStore } from '../../stores/StoreProvider'


const ProfileDropdown = () => {

    const { userStore } = useStore()

    const router = useRouter()


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <CircleUserRound className='w-6 h-6 hover:cursor-pointer'/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-40'>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={()=>{router.push('/userProfile')}} className='flex gap-2 hover:cursor-pointer'>
                      <UserRoundPen/>  Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>{userStore.logout(), router.push('/')}} className='flex gap-2 hover:cursor-pointer'>
                       <LogOut/> Logout
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default observer(ProfileDropdown)