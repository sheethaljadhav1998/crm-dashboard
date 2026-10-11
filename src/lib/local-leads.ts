import type { Lead } from "@/types/lead";

const KEY = "crm-local-leads";

export function getLocalLeads(): Lead[] {
    try {
        return JSON.parse(localStorage.getItem(KEY) ?? "[]");
    } catch {
        return [];
    }
}

export function saveLocalLeads(leads: Lead[]) {
    try {
        localStorage.setItem(KEY, JSON.stringify(leads));
    } catch {
        /* storage unavailable, ignore */
    }
}

export function upsertLocalLead(lead: Lead) {
    const id = String(lead.id);
    saveLocalLeads([lead, ...getLocalLeads().filter((l) => String(l.id) !== id)]);
}
