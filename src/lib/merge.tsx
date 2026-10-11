import type { Lead } from "@/types/lead";
import { getDeletedIds } from "@/lib/deleted";

export function mergeLeads(local: Lead[], server: Lead[]): Lead[] {
    const deleted = getDeletedIds();
    const keptLocal = local.filter((l) => !deleted.has(String(l.id)));
    const localIds = new Set(keptLocal.map((l) => String(l.id)));

    const fresh = server.filter(
        (s) => !localIds.has(String(s.id)) && !deleted.has(String(s.id))
    );

    // local version always wins, so edits and new leads survive
    return [...keptLocal, ...fresh];
}