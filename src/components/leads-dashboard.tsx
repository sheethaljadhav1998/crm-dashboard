"use client";

import { useMemo, useState } from "react";
import { AlertCircle, RefreshCw, Search, Users } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LeadCard } from "@/components/lead-card";
import { LeadGridSkeleton } from "@/components/lead-grid-skeleton";
import { useLeads } from "@/hooks/use-leads";
import { LeadFormDialog } from "@/components/lead-form-dialog";
import { toast } from "sonner";

export function LeadsDashboard() {
    const { data: leads = [], isLoading, isError, error, refetch, isFetching } = useLeads();
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return leads;
        return leads.filter((l) =>
            `${l.first_name} ${l.last_name} ${l.email} ${l.job}`.toLowerCase().includes(q)
        );
    }, [leads, query]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
            {/* Header */}
            <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Users className="size-4" /> CRM
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Lead Directory</h1>
                    <p className="text-muted-foreground">
                        {isLoading ? "Loading leads…" : `${leads.length} leads in your pipeline`}
                    </p>
                </div>

                <div className="flex w-full gap-2 sm:w-auto">
                    <Button
                        onClick={async () => {
                            const res = await refetch();
                            if (res.isError) toast.error("Could not refresh data");
                            else toast.success("Data refreshed");
                        }}
                        disabled={isFetching}
                        variant="outline"
                        className="flex-1 sm:flex-none"
                    >
                        <RefreshCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} />
                        {isFetching ? "Refreshing…" : "Refresh Data"}
                    </Button>
                    <LeadFormDialog />
                </div>
            </header>

            {/* Search */}
            <div className="relative mb-6 w-full sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, email or title…"
                    className="pl-9 bg-white"
                />
            </div>

            {/* Error state */}
            {isError && (
                <div className="flex flex-col items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-10 text-center">
                    <AlertCircle className="size-8 text-destructive" />
                    <p className="font-medium">Couldn&apos;t load leads</p>
                    <p className="text-sm text-muted-foreground">{(error as Error).message}</p>
                    <Button onClick={() => refetch()} variant="outline">Try again</Button>
                </div>
            )}

            {/* Grid */}
            {!isError && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

            {/* Empty state */}
            {!isLoading && !isError && filtered.length === 0 && (
                <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
                    {query ? "No leads match your search." : "No leads yet. Add your first lead to get started."}
                </div>
            )}
        </div>
    );
}