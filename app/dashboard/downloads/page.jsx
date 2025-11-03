"use client"

import { useState, useEffect } from "react"
import { Download, Calendar } from "lucide-react"

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState([])

  useEffect(() => {
    // Mock downloads - in production, fetch from API
    setDownloads([
      {
        id: "1",
        productTitle: "React Component Library",
        downloadDate: "2025-01-15",
        downloadCount: 3,
      },
      {
        id: "2",
        productTitle: "Web Design Course",
        downloadDate: "2025-01-12",
        downloadCount: 1,
      },
      {
        id: "3",
        productTitle: "Next.js Starter Kit",
        downloadDate: "2025-01-08",
        downloadCount: 5,
      },
    ])
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Download History</h1>
        <p className="text-muted-foreground">Track all your downloads</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {downloads.map((download) => (
          <div key={download.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                {download.downloadCount} downloads
              </span>
            </div>

            <h3 className="font-semibold mb-2">{download.productTitle}</h3>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{new Date(download.downloadDate).toLocaleDateString()}</span>
            </div>

            <button className="w-full mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition font-medium">
              Download Again
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
