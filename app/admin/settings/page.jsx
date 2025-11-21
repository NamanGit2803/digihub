"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import  GeneralSettings  from "@/components/admin/settings/general-settings"
import SiteSettings from "@/components/admin/settings/site-settings"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toJS } from "mobx"

const SettingsPage = () => {

  const { siteSettingStore } = useStore()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and preferences
        </p>
      </div>

      <Tabs defaultValue="site" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="site">Site Settings</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value="site">
          <SiteSettings />
        </TabsContent>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default observer(SettingsPage)
