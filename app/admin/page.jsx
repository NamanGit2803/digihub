"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/admin/stat-card"
import { SalesChart } from "@/components/admin/sales-chart"
import { OrdersTable } from "@/components/admin/orders-table"
import { Users, ShoppingCart, TrendingUp, DollarSign } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value="2,843" icon={Users} trend="+12.5%" description="from last month" />
        <StatCard title="Total Orders" value="1,234" icon={ShoppingCart} trend="+8.2%" description="from last month" />
        <StatCard title="Revenue" value="$45,231" icon={DollarSign} trend="+23.1%" description="from last month" />
        <StatCard title="Growth" value="18.2%" icon={TrendingUp} trend="+4.3%" description="from last month" />
      </div>

      {/* Charts and Tables */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Monthly sales trends</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesChart />
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Key metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Average Order Value</p>
              <p className="text-2xl font-bold">$156.42</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold">3.24%</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
              <p className="text-2xl font-bold">4.8/5.0</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders from your store</CardDescription>
        </CardHeader>
        <CardContent>
          <OrdersTable />
        </CardContent>
      </Card>
    </div>
  )
}


export default observer(DashboardPage)
