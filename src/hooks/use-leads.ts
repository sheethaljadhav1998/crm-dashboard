"use client";

import { useQuery } from "@tanstack/react-query";
import { getLeads } from "@/lib/api";
import { getLocalLeads, saveLocalLeads } from "@/lib/local-leads";
import { mergeLeads } from "@/lib/merge";

export const LEADS_KEY = ["leads"] as const;

export function useLeads() {
    return useQuery({
        queryKey: LEADS_KEY,
        queryFn: async () => {
            const server = await getLeads(1);
            // Re-read storage after the request so a lead created mid-fetch is not overwritten.
            const merged = mergeLeads(getLocalLeads(), server);
            const latest = mergeLeads(getLocalLeads(), merged);
            saveLocalLeads(latest);
            return latest;
        },
    });
}