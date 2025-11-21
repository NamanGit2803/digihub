'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Download } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { useEffect } from "react"
import { CircleCheckBig } from "lucide-react"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

const DownloadsSection = () => {

  const { orderStore, userStore } = useStore()

  useEffect(() => {
    orderStore.fetchAllOrdersForUser(userStore.user.email)
  }, [])


  const startDownload = async (orderId) => {
    await orderStore.downloadFile(orderId, userStore.user.email)

    if (!orderStore.error) {
      toast(<div className='flex gap-2 items-center'><CircleCheckBig className='w-4 h-4' /><span>Download Starting…</span></div>)
    } else {
      toast.error(orderStore.error)
    }
  }


  return (
    <div className="space-y-4 max-h-[80vh] overflow-y-scroll">
      <h2 className="text-2xl font-bold text-foreground bg-background sticky top-0 py-2">
        Download History
      </h2>

      {/* 👉 SKELETON LOADER WHILE FETCHING */}
      {orderStore.loading && (
        <>
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Skeleton className="w-20 h-20 sm:w-16 sm:h-16 rounded-md" />
                  <div className="flex-1 w-full sm:w-auto space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-8 w-24 sm:w-32 rounded-md" />
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      )}

      {/* 👉 NO ORDERS FOUND */}
      {!orderStore.loading && orderStore.orders.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          <p className="text-lg font-medium">No orders yet</p>
          <p className="text-sm">Your downloaded items will appear here</p>
        </div>
      )}

      {/* 👉 ORDERS LIST */}
      {!orderStore.loading && orderStore.orders.length > 0 &&
        orderStore.orders.map((download) => (
          <Card key={download.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                {/* PRODUCT IMAGE */}
                <img
                  src={download.product?.image}
                  alt={download.product?.title}
                  className="w-20 h-20 sm:w-16 sm:h-16 rounded-md object-cover"
                />

                {/* PRODUCT DETAILS */}
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <p className="font-semibold text-foreground truncate">
                    {download.product?.title}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Purchased on: {new Date(download.created_at).toLocaleString()}
                  </p>
                </div>

                {/* DOWNLOAD BUTTON */}
                <Button
                  size="sm"
                  className="gap-2 hover:cursor-pointer w-full sm:w-auto"
                  disabled={!download.download_allow  || orderStore.downloading}
                  onClick={() => startDownload(download.id)}
                >
                  {orderStore.downloading ? <Spinner/> : <Download className="w-4 h-4" />}
                  {download.download_allow ? orderStore.downloading ? "Download Starting..." : "Download" : "Waiting For Approval" }
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      }
    </div>
  )
}

export default observer(DownloadsSection)
