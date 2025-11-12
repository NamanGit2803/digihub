import React from 'react'
import { observer } from "mobx-react-lite"
import { useStore } from '../stores/StoreProvider'
import { toJS } from "mobx"
import { ArrowRight, CheckCircle } from "lucide-react"


const Hero = () => {
    return (
        <section className="bg-linear-to-br from-primary/10 to-accent/10 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Discover Premium Digital Products</h1>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
                        Access thousands of high-quality digital products including templates, courses, e-books, and more.
                    </p>
                    <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition font-medium">
                        Start Exploring
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default observer(Hero)