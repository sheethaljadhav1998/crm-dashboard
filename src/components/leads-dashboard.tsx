"use client";

import { useMemo, useState } from "react";
import { AlertCircle, RefreshCw, Search, SearchX, Users, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LeadCard } from "@/components/lead-card";
import { LeadGridSkeleton } from "@/components/lead-grid-skeleton";
import { LeadFormDialog } from "@/components/lead-form-dialog";
import { useLeads } from "@/hooks";
import { filterLeads } from "@/utils";
import { toast } from "sonner";

export function LeadsDashboard() {
    const { data: leads = [], isLoading, isError, error, refetch, isFetching } = useLeads();
    const [query, setQuery] = useState("");
    const filtered = useMemo(() => filterLeads(leads, query), [leads, query]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name, email or title…"
                        className="h-11 rounded-full bg-card pl-11 pr-10 shadow-sm"
                    />
                    {query && (
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => setQuery("")}
                            aria-label="Clear search"
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full"
                        >
                            <X />
                        </Button>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={async () => {
                            const res = await refetch();
                            if (res.isError) toast.error("Could not refresh data");
                            else toast.success("Data refreshed");
                        }}
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
                {!isLoading && !isError && (
                    <p className="text-sm text-muted-foreground sm:ml-auto">
                        Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
                        <span className="font-semibold text-foreground">{leads.length}</span> leads
                    </p>
                )}
            </div>

            {isError && (
                <div className="flex flex-col items-center gap-3 rounded-3xl border border-destructive/20 bg-card p-12 text-center shadow-sm">
                    <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
                        <AlertCircle className="size-6 text-destructive" />
                    </div>
                    <p className="text-lg font-semibold">Couldn&apos;t load leads</p>
                    <p className="text-sm text-muted-foreground">{error?.message}</p>
                    <Button onClick={() => refetch()} className="mt-2 rounded-full px-5">Try again</Button>
                </div>
            )}

            {!isError && (
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

            {!isLoading && !isError && filtered.length === 0 && (
                <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-primary/25 bg-card/60 p-12 text-center">
                    <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                        {query ? <SearchX className="size-6" /> : <Users className="size-6" />}
                    </div>
                    <p className="text-lg font-semibold">{query ? "No matching leads" : "No leads yet"}</p>
                    <p className="text-sm text-muted-foreground">
                        {query ? "Try a different name, email or job title." : "Add your first lead to get started."}
                    </p>
                    {query && (
                        <Button variant="secondary" onClick={() => setQuery("")} className="mt-2 rounded-full px-5">
                            Clear search
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
