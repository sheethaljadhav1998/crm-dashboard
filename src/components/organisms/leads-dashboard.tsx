"use client";

import { useMemo, useState } from "react";
import { AlertCircle, RefreshCw, SearchX, Users } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/atoms/button";
import { SearchInput } from "@/components/molecules/search-input";
import { StatusMessage } from "@/components/molecules/status-message";
import { LeadCard } from "@/components/organisms/lead-card";
import { LeadFormDialog } from "@/components/organisms/lead-form-dialog";
import { LeadGridSkeleton } from "@/components/organisms/lead-grid-skeleton";
import { useLeads } from "@/hooks";
import { filterLeads } from "@/utils";

export function LeadsDashboard() {
    const { data: leads = [], isLoading, isError, error, refetch, isFetching } = useLeads();
    const [query, setQuery] = useState("");
    const filtered = useMemo(() => filterLeads(leads, query), [leads, query]);
    const isReady = !isLoading && !isError;

    const refresh = async () => {
        const res = await refetch();
        if (res.isError) toast.error("Could not refresh data");
        else toast.success("Data refreshed");
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <SearchInput value={query} onChange={setQuery} placeholder="Search by name, email or title…" />
                <div className="flex gap-2">
                    <Button
                        onClick={refresh}
                        disabled={isFetching}
                        variant="outline"
                        size="lg"
                        className="h-11 flex-1 rounded-full bg-card px-5 shadow-sm sm:flex-none"
                    >
                        <RefreshCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} />
                        {isFetching ? "Refreshing…" : "Refresh"}
                    </Button>
                    <LeadFormDialog className="h-11 flex-1 rounded-full px-5 shadow-sm shadow-primary/20 sm:flex-none" />
                </div>
                {isReady && (
                    <p className="text-sm text-muted-foreground sm:ml-auto">
                        Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
                        <span className="font-semibold text-foreground">{leads.length}</span> leads
                    </p>
                )}
            </div>

            {isError ? (
                <StatusMessage
                    tone="error"
                    icon={AlertCircle}
                    title="Couldn't load leads"
                    description={error?.message}
                    action={<Button onClick={() => refetch()} className="mt-2 rounded-full px-5">Try again</Button>}
                />
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {isLoading ? (
                        <LeadGridSkeleton />
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filtered.map((lead, i) => (
                                <LeadCard key={lead.id} lead={lead} index={i} />
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            )}

            {isReady && filtered.length === 0 && (
                <StatusMessage
                    icon={query ? SearchX : Users}
                    title={query ? "No matching leads" : "No leads yet"}
                    description={query ? "Try a different name, email or job title." : "Add your first lead to get started."}
                    action={
                        query && (
                            <Button variant="secondary" onClick={() => setQuery("")} className="mt-2 rounded-full px-5">
                                Clear search
                            </Button>
                        )
                    }
                />
            )}
        </div>
    );
}
