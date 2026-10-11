"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createLead } from "@/lib/api";
import { LEADS_KEY } from "@/hooks/use-leads";
import { upsertLocalLead } from "@/lib/local-leads";
import type { Lead, LeadInput } from "@/types/lead";

export function useCreateLead() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (input: LeadInput) => createLead(input),
        onSuccess: (lead) => {
            upsertLocalLead(lead);
            qc.setQueryData<Lead[]>(LEADS_KEY, (old = []) => [lead, ...old]);
            toast.success(`${lead.first_name} ${lead.last_name} added to your leads`);
        },
        onError: (err: Error) => toast.error(err.message),
    });
}