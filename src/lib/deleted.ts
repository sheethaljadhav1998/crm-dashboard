const KEY = "crm-deleted-ids";

export function getDeletedIds(): Set<string> {
    try {
        return new Set<string>(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
    } catch {
        return new Set();
    }
}

export function markDeleted(id: string | number) {
    try {
        const ids = getDeletedIds();
        ids.add(String(id));
        localStorage.setItem(KEY, JSON.stringify([...ids]));
    } catch {
        /* storage unavailable, ignore */
    }
}