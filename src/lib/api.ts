import { USERS_API } from "@/constants";
import type { LeadInput } from "@/lib/schemas";
import type { ApiUser, Lead } from "@/types";
import { getAvatarUrl, getFullName, mapUserToLead, toJob } from "@/utils";

const json = (method: string, body: unknown): RequestInit => ({
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
});

async function request(url: string, init: RequestInit, action: string) {
    const res = await fetch(url, init);
    if (!res.ok) throw new Error(`Could not ${action} (${res.status})`);
    return res;
}

export async function getLeads(): Promise<Lead[]> {
    const res = await request(`${USERS_API}?page=1`, {}, "load leads");
    const body: { data?: ApiUser[] } = await res.json();
    return body?.data?.map(mapUserToLead) ?? [];
}

export async function createLead(input: LeadInput): Promise<Lead> {
    const res = await request(USERS_API, json("POST", input), "create lead");
    const body: { id?: Lead["id"] } = await res.json();
    return {
        ...mapUserToLead({ ...input, id: body?.id }),
        job: toJob(input.job),
        avatar: getAvatarUrl(getFullName(input)),
    };
}

export async function updateLead(id: Lead["id"], input: LeadInput) {
    await request(`${USERS_API}/${id}`, json("PUT", input), "update lead");
}

export async function patchLead(id: Lead["id"], input: Partial<LeadInput>) {
    await request(`${USERS_API}/${id}`, json("PATCH", input), "update lead");
}

export async function deleteLead(id: Lead["id"]) {
    await request(`${USERS_API}/${id}`, { method: "DELETE" }, "delete lead");
}
