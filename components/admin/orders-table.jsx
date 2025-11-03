import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const orders = [
  { id: "#1001", customer: "John Doe", amount: "$234.00", status: "completed", date: "2024-11-01" },
  { id: "#1002", customer: "Jane Smith", amount: "$120.50", status: "pending", date: "2024-11-02" },
  { id: "#1003", customer: "Bob Johnson", amount: "$456.00", status: "completed", date: "2024-11-02" },
  { id: "#1004", customer: "Alice Williams", amount: "$89.99", status: "cancelled", date: "2024-11-03" },
  { id: "#1005", customer: "Charlie Brown", amount: "$567.50", status: "completed", date: "2024-11-03" },
]

export function OrdersTable() {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>{order.amount}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(order.status)} variant="outline">
                {order.status}
              </Badge>
            </TableCell>
            <TableCell>{order.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
