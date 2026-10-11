import { AVATAR_BASE_URL, JOB_TITLES, NO_JOB } from "@/constants";
import type { ApiUser, Lead } from "@/types";

export { cn } from "cn";

export const toJob = (job?: string) => job?.trim() || NO_JOB;

export const getFullName = (lead: Pick<Lead, "first_name" | "last_name">) => `${lead.first_name} ${lead.last_name}`;

export const getInitials = (lead: Pick<Lead, "first_name" | "last_name">) =>
    `${lead.first_name.charAt(0)}${lead.last_name.charAt(0)}`.toUpperCase();

export const getAvatarUrl = (name: string) => `${AVATAR_BASE_URL}?seed=${encodeURIComponent(name)}`;

export const mapUserToLead = (user?: ApiUser): Lead => ({
    id: user?.id ?? "",
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
    email: user?.email ?? "",
    avatar: user?.avatar ?? "",
    job: toJob(JOB_TITLES[Number(user?.id) % JOB_TITLES.length]),
});

export const filterLeads = (leads: Lead[], query: string) =>
    leads.filter((l) =>
        `${getFullName(l)} ${l.email} ${l.job}`.toLowerCase().includes(query.trim().toLowerCase())
    );
