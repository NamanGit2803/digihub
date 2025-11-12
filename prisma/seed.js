import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.siteSetting.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            siteName: "My Amazing Store",
            siteLogoUrl: "/site-logo.jpg",
            heroTitle: "Welcome to Our Store",
            heroSubtitle: "Discover amazing products at unbeatable prices",
            metaDescription: "Your one-stop shop for quality products",
        },
    })

    console.log("✅ Default site setting inserted successfully!")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
