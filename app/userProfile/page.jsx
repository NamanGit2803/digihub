'use client'

import React from 'react'
import { useState } from 'react'
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import ProfileHeader from '../../components/user/profile/profile-header'
import ProfileNav from '../../components/user/profile/profile-nav'
import DownloadsSection from '../../components/user/profile/downloads-section'
import dynamic from "next/dynamic"

const ProfileInfo = dynamic(() => import("../../components/user/profile/profile-info"), {
  ssr: false,
})


const UserProfile = () => {

    const [activeTab, setActiveTab] = useState("info")

    return (
        <div className="min-h-screen bg-background">
            <ProfileHeader />
            <main className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === "info" && <ProfileInfo />}
                {activeTab === "downloads" && <DownloadsSection />}
            </main>
        </div>
    )
}

export default observer(UserProfile)