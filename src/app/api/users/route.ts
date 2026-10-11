import { forwardRequest } from "@/lib/reqres";

export async function GET(request: Request) {
    const page = new URL(request.url).searchParams.get("page") ?? "1";
    return forwardRequest(`/users?page=${page}`);
}

export async function POST(req: Request) {
    return forwardRequest("/users", { method: "POST", body: await req.text() });
}