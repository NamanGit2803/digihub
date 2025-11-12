"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, CheckCircle, Trash2 } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toJS } from "mobx"
import { toast } from "sonner"

const SiteSettings = () => {

    const { siteSettingStore } = useStore()
    const [formData, setFormData] = useState({
        siteName: "",
        siteLogoUrl: "",
        heroTitle: "",
        heroSubtitle: "",
    })
    const [logoFile, setLogoFile] = useState(null)

    useEffect(() => {
        siteSettingStore.fetchData()
    }, [])

    useEffect(() => {
        const data = siteSettingStore.siteData || {}

        setFormData({
            siteName: data.siteName ?? "",
            siteLogoUrl: data.siteLogoUrl ?? "",
            heroTitle: data.heroTitle ?? "",
            heroSubtitle: data.heroSubtitle ?? "",
            metaDescription: data.metaDescription ?? "",
        })
    }, [siteSettingStore.siteData])



    // handle upload image 
    const handleLogoUpload = (e) => {
        const file = e.target.files?.[0]
        console.log("file", file)
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData({ ...formData, siteLogoUrl: reader.result })
                setLogoFile(file)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRemoveLogo = () => {
        setFormData({ ...formData, siteLogoUrl: "" })
        setLogoFile(null)
    }

    // save changes 
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
        <div className="space-y-6">
            {/* Logo Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Site Logo</CardTitle>
                    <CardDescription>Upload and manage your website logo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-8 lg:gap-20">
                        {/* Left side — Upload controls */}
                        <div className="flex flex-col items-start gap-3 w-1/2">
                            <Label htmlFor="logo-upload" className="cursor-pointer w-full">
                                <div className="flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-muted-foreground rounded-md hover:border-foreground transition-colors text-sm">
                                    <Upload className="w-4 h-4 mr-2" />
                                    <span>Upload Logo (PNG, JPG, SVG)</span>
                                </div>
                            </Label>
                            <input
                                id="logo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="hidden"
                            />

                            {formData.siteLogoUrl && !formData.siteLogoUrl.includes("placeholder") && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleRemoveLogo}
                                    className="w-full sm:w-auto"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Remove Logo
                                </Button>
                            )}
                        </div>

                        {/* Right side — Larger Image Preview */}
                        <div className="w-[30%] h-36 bg-muted border border-dashed border-muted-foreground rounded-lg flex items-center justify-center overflow-hidden">
                            {formData.siteLogoUrl ? (
                                <img
                                    src={formData.siteLogoUrl}
                                    alt="Site logo preview"
                                    className="w-full h-full object-fill"
                                />
                            ) : (
                                <span className="text-sm text-muted-foreground">No Logo</span>
                            )}
                        </div>
                    </div>

                </CardContent>
            </Card>

            {/* Site Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Site Information</CardTitle>
                    <CardDescription>Update your website name and branding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="site-name">Site Name</Label>
                        <Input
                            id="site-name"
                            value={formData.siteName}
                            onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                            placeholder="Enter your site name"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Hero Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Hero Section</CardTitle>
                    <CardDescription>Customize your homepage hero section</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="hero-title">Hero Title</Label>
                        <Input
                            id="hero-title"
                            value={formData.heroTitle}
                            onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                            placeholder="Enter hero section title"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                        <Textarea
                            id="hero-subtitle"
                            value={formData.heroSubtitle}
                            onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                            placeholder="Enter hero section subtitle"
                            rows={3}
                        />
                    </div>

                    {/* Preview */}
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-foreground">{formData.heroTitle}</h2>
                            <p className="text-muted-foreground">{formData.heroSubtitle}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Save Button */}
            <Button onClick={handleSave} disabled={siteSettingStore.loading} size="lg" className="w-full hover:cursor-pointer">
                {siteSettingStore.loading ? 'Saving Changes...' : 'Save All Changes'}
            </Button>
        </div>
    )
}

export default observer(SiteSettings)
