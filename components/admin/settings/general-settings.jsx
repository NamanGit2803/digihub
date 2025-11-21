"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toJS } from "mobx"
import { toast } from "sonner"
import { Upload, CheckCircle, Trash2 } from "lucide-react"

const GeneralSettings = () => {

  const { siteSettingStore } = useStore()

  const [formData, setFormData] = useState({
    contact_email: "",
    contact_number: "",
    business_address: "",
  })

  useEffect(() => {
    siteSettingStore.fetchData()
  }, [])


  useEffect(() => {
    const data = siteSettingStore.siteData || {}

    setFormData({
      contact_email: data.contact_email ?? "",
      contact_number: data.contact_number ?? "",
      business_address: data.business_address ?? "",
    })
  }, [siteSettingStore.siteData])

  const handleSave = async () => {
    await siteSettingStore.updateSiteData(formData)

    if (!siteSettingStore.error) {
      toast(
        <div className="flex gap-2 items-center">
          <CheckCircle className="text-green-600 w-4 h-4" />
          <span>Data updated successfully</span>
        </div>
      )
    } else {
      toast.error(siteSettingStore.error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Update your company information and preferences</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Contact email */}
        <div className="space-y-2">
          <Label htmlFor="email">Contact Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.contact_email}
            onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
            placeholder="Enter contact email"
          />
        </div>

        {/* Contact number */}
        <div className="space-y-2">
          <Label htmlFor="email">Contact Number</Label>
          <Input
            id="phone"
            type="text"
            value={formData.contact_number}
            onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
            placeholder="Enter contact number"
          />
        </div>

        {/* address */}
        <div className="space-y-2">
          <Label htmlFor="email">Business Address</Label>
          <Input
            id="address"
            type="text"
            value={formData.business_address}
            onChange={(e) => setFormData({ ...formData, business_address: e.target.value })}
            placeholder="Enter business address"
          />
        </div>

        <Button disabled={siteSettingStore.loading} className='hover:cursor-pointer' onClick={handleSave}>{siteSettingStore.loading ? 'Saving Changes...' : 'Save Changes'}</Button>
      </CardContent>
    </Card>
  )
}

export default observer(GeneralSettings)
