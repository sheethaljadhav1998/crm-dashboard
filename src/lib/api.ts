import type { Lead } from "@/types/lead";

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