import { fetchLeads } from "@/lib/reqres";

export async function GET(request: Request) {
    const page = new URL(request.url).searchParams.get("page") ?? "1";
    return fetchLeads(`/users?page=${page}`);
}