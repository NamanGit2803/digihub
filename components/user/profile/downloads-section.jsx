import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function DownloadsSection() {
  const downloads = [
    {
      id: 1,
      name: "Invoice_Oct2024.pdf",
      date: "2024-10-25",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Receipt_Order_001.pdf",
      date: "2024-10-20",
      size: "1.1 MB",
    },
    {
      id: 3,
      name: "Tax_Document_2024.pdf",
      date: "2024-10-15",
      size: "3.7 MB",
    },
    {
      id: 4,
      name: "Purchase_Summary.pdf",
      date: "2024-10-10",
      size: "890 KB",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Download History</h2>
      {downloads.map((download) => (
        <Card key={download.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-semibold text-foreground">{download.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(download.date).toLocaleDateString()} • {download.size}
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
