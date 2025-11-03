"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", sales: 4000, revenue: 2400 },
  { month: "Feb", sales: 3000, revenue: 1398 },
  { month: "Mar", sales: 2000, revenue: 9800 },
  { month: "Apr", sales: 2780, revenue: 3908 },
  { month: "May", sales: 1890, revenue: 4800 },
  { month: "Jun", sales: 2390, revenue: 3800 },
]

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
        <XAxis dataKey="month" stroke="hsl(var(--color-muted-foreground))" />
        <YAxis stroke="hsl(var(--color-muted-foreground))" />
        <Tooltip />
        <Line type="monotone" dataKey="sales" stroke="hsl(var(--color-primary))" />
        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--color-accent))" />
      </LineChart>
    </ResponsiveContainer>
  )
}
