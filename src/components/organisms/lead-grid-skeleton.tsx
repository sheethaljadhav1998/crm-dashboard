import { LeadCardSkeleton } from "@/components/molecules/lead-card-skeleton";
import { SKELETON_COUNT } from "@/constants";

export function LeadGridSkeleton() {
    return (
        <>
            {Array.from({ length: SKELETON_COUNT }, (_, i) => (
                <LeadCardSkeleton key={i} />
            ))}
        </>
    );
}
