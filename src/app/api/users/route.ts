import { forwardRequest } from "@/lib/reqres";

export async function GET(request: Request) {
    return forwardRequest(`/users${new URL(request.url).search}`);
}

export async function POST(req: Request) {
    return forwardRequest("/users", { method: "POST", body: await req.text() });
}