"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function GeneralSettings() {
  const [formData, setFormData] = useState({
    companyName: "My Company",
    email: "admin@mycompany.com",
    timezone: "UTC",
    currency: "USD",
  })

  const handleSave = () => {
    // 💾 Add your API call or MobX store update here
    console.log("Saving settings:", formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Update your company information and preferences</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Company Name */}
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="Enter company name"
          />
        </div>

        {/* Contact Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Contact Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter contact email"
          />
        </div>

        {/* Timezone + Currency */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={formData.timezone}
              onValueChange={(val) => setFormData({ ...formData, timezone: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="EST">EST</SelectItem>
                <SelectItem value="PST">PST</SelectItem>
                <SelectItem value="CST">CST</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={formData.currency}
              onValueChange={(val) => setFormData({ ...formData, currency: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleSave}>Save Changes</Button>
      </CardContent>
    </Card>
  )
}
