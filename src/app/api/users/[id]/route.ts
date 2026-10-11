import { forwardRequest } from "@/lib/reqres";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
    const { id } = await params;
    return forwardRequest(`/users/${id}`, { method: "PUT", body: await req.text() });
}

export async function PATCH(req: Request, { params }: Ctx) {
    const { id } = await params;
    return forwardRequest(`/users/${id}`, { method: "PATCH", body: await req.text() });
}

export async function DELETE(_req: Request, { params }: Ctx) {
    const { id } = await params;
    return forwardRequest(`/users/${id}`, { method: "DELETE" });
}