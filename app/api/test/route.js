import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function GET() {
  const dbName = await prisma.$queryRaw`SELECT DATABASE();`
  return Response.json({ connectedTo: dbName })
}
