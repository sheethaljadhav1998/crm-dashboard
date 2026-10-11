"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LEADS_QUERY_KEY } from "@/constants";
import { createLead, deleteLead, getLeads, patchLead, updateLead } from "@/lib/api";
import type { LeadInput } from "@/lib/schemas";
import type { Lead } from "@/types";
import { toJob } from "@/utils";

export function useLeads() {
    return useQuery({ queryKey: LEADS_QUERY_KEY, queryFn: getLeads });
}

function useSetLeads() {
    const qc = useQueryClient();
    return (update: (leads: Lead[]) => Lead[]) =>
        qc.setQueryData<Lead[]>(LEADS_QUERY_KEY, (leads = []) => update(leads));
}

const onError = (e: Error) => toast.error(e.message);

export function useCreateLead() {
    const setLeads = useSetLeads();
    return useMutation({
        mutationFn: createLead,
        onSuccess: (lead) => {
            setLeads((leads) => [lead, ...leads]);
            toast.success(`${lead.first_name} ${lead.last_name} added to your leads`);
        },
        onError,
    });
}

export function useUpdateLead() {
    const setLeads = useSetLeads();
    return useMutation({
        mutationFn: ({ id, input }: { id: Lead["id"]; input: LeadInput }) => updateLead(id, input),
        onSuccess: (_, { id, input }) => {
            setLeads((leads) => leads.map((l) => (l.id === id ? { ...l, ...input, job: toJob(input.job) } : l)));
            toast.success("Lead updated");
        },
        onError,
    });
}

export function useUpdateJob() {
    const setLeads = useSetLeads();
    return useMutation({
        mutationFn: ({ id, job }: { id: Lead["id"]; job: string }) => patchLead(id, { job }),
        onSuccess: (_, { id, job }) => {
            setLeads((leads) => leads.map((l) => (l.id === id ? { ...l, job: toJob(job) } : l)));
            toast.success("Job title updated");
        },
        onError,
    });
}

export function useDeleteLead() {
    const setLeads = useSetLeads();
    return useMutation({
        mutationFn: deleteLead,
        onSuccess: (_, id) => {
            setLeads((leads) => leads.filter((l) => l.id !== id));
            toast.success("Lead deleted");
        },
        onError,
    });
}
