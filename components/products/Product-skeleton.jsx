export default function ProductSkeleton() {
    return (
        <div className="border border-border p-4 rounded-lg animate-pulse">
            <div className="w-full h-40 bg-muted rounded-md"></div>

            <div className="mt-3 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>

            <div className="h-8 bg-muted rounded mt-4 w-full"></div>
        </div>
    )
}
