import { NextResponse } from "next/server";
import { REQRES_BASE_URL } from "@/constants";

export async function forwardRequest(path: string, init?: RequestInit) {
    const key = process.env.REQRES_API_KEY;
    const res = await fetch(`${REQRES_BASE_URL}${path}`, {
        ...init,
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            ...(key ? { "x-api-key": key } : {}),
        },
    });
    const text = await res.text();
    return new NextResponse(text || null, {
        status: res.status,
        headers: { "Content-Type": "application/json" },
    });
}