import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function OrdersSection() {
  const orders = [
    {
      id: "ORD-001",
      date: "2024-10-25",
      total: "$299.99",
      items: 3,
    },
    {
      id: "ORD-002",
      date: "2024-10-20",
      total: "$149.50",
      items: 1,
    },
    {
      id: "ORD-003",
      date: "2024-10-15",
      total: "$89.99",
      items: 2,
    },
    {
      id: "ORD-004",
      date: "2024-10-10",
      total: "$199.00",
      items: 1,
    },
  ]


  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">My Orders</h2>
      {orders.map((order) => (
        <Card key={order.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-semibold text-foreground">{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{order.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
