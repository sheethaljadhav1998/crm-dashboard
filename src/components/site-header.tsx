import { Users } from "lucide-react";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-30 bg-linear-to-r from-foreground via-primary to-chart-3 text-primary-foreground shadow-md shadow-primary/20">
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                    <Users className="size-4" />
                </div>
                <h1 className="truncate text-base font-bold tracking-tight sm:text-lg">
                    CRM Lead Management Dashboard
                </h1>
            </div>
        </header>
    );
}
