import { Card, CardContent } from "@/components/atoms/card";
import { Skeleton } from "@/components/atoms/skeleton";

export function LeadCardSkeleton() {
    return (
        <Card className="gap-0 rounded-2xl py-0 ring-border">
            <Skeleton className="h-20 rounded-none bg-secondary" />
            <CardContent className="flex flex-col gap-4 px-5 pb-5">
                <Skeleton className="-mt-10 size-20 rounded-full ring-4 ring-card" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="space-y-2 border-t pt-4">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-9 w-full" />
                </div>
            </CardContent>
        </Card>
    );
}
