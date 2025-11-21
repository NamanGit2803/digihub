'use client'

import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className="bg-card border-t border-border py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className='flex flex-col gap-3'>
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-lg">D</span>
                            </div>
                            <span className="font-bold text-xl hidden sm:inline">DigitalHub</span>
                        </Link>
                        <p className="text-muted-foreground text-sm">Your trusted marketplace for digital products.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Products</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-primary transition">
                                    Templates
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition">
                                    Courses
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition">
                                    E-books
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="/about" className="hover:text-primary transition">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:text-primary transition">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-primary transition">
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition">
                                    Terms
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
                    <p>&copy; 2025 DigitalHub. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer