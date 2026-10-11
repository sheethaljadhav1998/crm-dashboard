import type { Lead, LeadInput } from "@/types/lead";

// API doesn't return job title for listed users, so assign a placeholder
const TITLES = [
  "Sales Manager",
  "Account Executive",
  "Marketing Lead",
  "Product Owner",
  "Business Analyst",
  "Customer Success",
];

export async function getLeads(page = 1): Promise<Lead[]> {
  const res = await fetch(`/api/users?page=${page}`);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const json = await res.json();
  return json.data.map((u: any) => ({
    id: u.id,
    first_name: u.first_name,
    last_name: u.last_name,
    email: u.email,
    avatar: u.avatar,
    job: TITLES[u.id % TITLES.length],
  }));
}

export async function createLead(input: LeadInput): Promise<Lead> {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...input, name: `${input.first_name} ${input.last_name}` }),
  });
  if (res.status !== 201) throw new Error(`Could not create lead (${res.status})`);
  const json = await res.json();
  return {
    id: json.id,
    first_name: input.first_name,
    last_name: input.last_name,
    email: input.email,
    job: input.job?.trim() || "Not specified",
    avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
      input.first_name + " " + input.last_name
    )}`,
  };
}