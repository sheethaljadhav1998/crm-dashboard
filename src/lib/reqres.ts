import { NextResponse } from "next/server";

const BASE = "https://reqres.in/api";

export async function fetchLeads(path: string, init?: RequestInit) {
    const key = process.env.REQRES_API_KEY;
    const res = await fetch(`${BASE}${path}`, {
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