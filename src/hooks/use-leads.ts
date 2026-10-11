"use client";

import { useQuery } from "@tanstack/react-query";
import { getLeads } from "@/lib/api";

export const LEADS_KEY = ["leads"] as const;

export function useLeads() {
    return useQuery({ queryKey: LEADS_KEY, queryFn: () => getLeads(1) });
}