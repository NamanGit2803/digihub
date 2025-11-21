'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toJS } from "mobx"
import { useEffect } from "react";

const ContactPage = () => {

    const { siteSettingStore } = useStore()

    useEffect(() => {
        siteSettingStore.fetchData()
    }, [])

    return (
        <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center py-10 px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 max-w-6xl w-full">

                {/* Left Side */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="p-6 sm:p-8 rounded-2xl shadow-lg">
                        <CardContent className="space-y-6 p-0">
                            <h1 className="text-4xl font-bold text-gray-900">Get in Touch</h1>
                            <p className="text-gray-600">We would love to hear from you! Reach out for queries, support or collaborations.</p>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-gray-700"><MapPin size={18} /> Address</h3>
                                    <p className="text-gray-600">{siteSettingStore.siteData?.business_address}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700"><Phone size={18} /> Phone</h3>
                                    <p className="text-gray-600">+91 {siteSettingStore.siteData?.contact_number}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700"><Mail size={18} /> Email</h3>
                                    <p className="text-gray-600">{siteSettingStore.siteData?.contact_email}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Right Side (Form) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card className="p-6 sm:p-8 rounded-2xl shadow-lg">
                        <CardContent className="space-y-5 p-0">
                            <Input placeholder="Full Name" className="h-12 text-base w-full" />
                            <Input type="email" placeholder="Email Address" className="h-12 text-base" />
                            <Input placeholder="Subject" className="h-12 text-base" />
                            <Textarea placeholder="Message" className="h-36 sm:h-40 text-base w-full" />
                            <Button className="w-full h-12 text-lg mt-2">Send Message</Button>
                        </CardContent>
                    </Card>
                </motion.div>

            </div>
        </div>
    );
}

export default observer(ContactPage)
