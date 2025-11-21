"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function AboutPage() {

    const router = useRouter()


    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* 🌟 Hero Section */}
            <section className="relative py-20 bg-linear-to-br from-primary/10 to-accent/10">
                <div className="max-w-5xl mx-auto text-center px-4">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Empowering Creators. Simplifying Digital Commerce.
                    </motion.h1>
                    <motion.p
                        className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        At <span className="font-semibold text-primary">DigitalHub</span>, we help creators and entrepreneurs
                        launch, manage, and scale their digital products effortlessly.
                    </motion.p>
                </div>
            </section>

            {/* 🚀 Our Mission */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Our mission is to make digital entrepreneurship accessible to everyone. We remove the barriers between
                        creativity and commerce — so you can focus on what you do best: <strong>creating</strong>.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mt-10 text-left">
                        {[
                            { title: "🚀 Empowerment", text: "We build tools that help creators grow sustainably." },
                            { title: "💡 Simplicity", text: "We make selling digital products fast, easy, and intuitive." },
                            { title: "🌱 Sustainability", text: "We support long-term success for independent creators." },
                        ].map((item, i) => (
                            <Card key={i} className="shadow-sm hover:shadow-md transition">
                                <CardContent className="p-6 space-y-2">
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm">{item.text}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🎨 What We Offer */}
            <section className="py-16 bg-muted/40 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
                        Everything you need to launch and scale your digital business.
                    </p>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            { icon: "🎓", title: "Courses", desc: "Sell and share your expertise through online learning." },
                            { icon: "🎨", title: "Templates", desc: "Professional design assets and UI kits ready to use." },
                            { icon: "📚", title: "E-books", desc: "Publish your guides and reach a global audience." },
                            { icon: "💳", title: "Payments", desc: "Fast, secure Razorpay-powered checkout." },
                            { icon: "📈", title: "Dashboard", desc: "Track performance, sales, and insights easily." },
                            { icon: "🤝", title: "Community", desc: "Join thousands of creators and entrepreneurs." },
                        ].map((item, i) => (
                            <Card key={i} className="hover:shadow-md transition">
                                <CardContent className="p-6 text-center space-y-3">
                                    <div className="text-4xl">{item.icon}</div>
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🕰️ Our Story */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            DigitalHub was founded by a small team of designers and developers who wanted to simplify the way digital
                            products are sold. We’ve experienced the challenges of managing stores, payments, and files — so we built
                            a platform that handles it all, beautifully.
                        </p>
                        <p className="text-muted-foreground mt-4">
                            What started as a side project is now a global hub connecting creators and customers worldwide.
                        </p>
                    </div>

                    <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
                        <Image
                            src="/about-hero.jpg"
                            alt="Team working"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition"
                        />
                    </div>
                </div>
            </section>

            {/* 💎 Why Choose Us */}
            <section className="py-16 bg-muted/30 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Why Choose DigitalHub</h2>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
                        {[
                            "⚡ Instant Setup — Launch your store in minutes",
                            "💳 Razorpay Payments — Trusted and secure",
                            "🧑‍🎨 Creator-Centered Design",
                            "📊 Insightful Analytics",
                            "💬 Dedicated Support",
                            "☁️ Lifetime Free Updates",
                        ].map((item, i) => (
                            <Card key={i}>
                                <CardContent className="p-5 text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground">{item}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🚪 CTA */}
            <section className="py-20 text-center px-4 bg-linear-to-br from-primary/10 to-accent/10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Discover & Buy Premium Digital Products
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Explore templates, courses, e-books, and digital assets crafted by top creators —
                    all available for instant download.
                </p>
                <Button
                    size="lg"
                    className="font-semibold"
                    onClick={() => router.push('/products')}
                >
                    Browse Products →
                </Button>
            </section>
        </div>
    )
}
