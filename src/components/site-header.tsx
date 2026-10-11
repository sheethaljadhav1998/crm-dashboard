import { APP_DESCRIPTION, APP_NAME } from "@/constants";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-30 bg-linear-to-br from-[#14476d] to-[#22388f] text-white shadow-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#38b6f1] to-[#283d97] shadow-sm">
                    <svg viewBox="0 0 24 24" className="size-6 fill-white" aria-hidden="true">
                        <path d="M3 5h18l-6.5 7.5V18l-5 2v-7.5z" />
                    </svg>
                </div>
                <div className="min-w-0">
                    <h1 className="truncate text-base font-bold leading-tight tracking-tight sm:text-lg">{APP_NAME}</h1>
                    <p className="hidden truncate text-xs text-sky-200 sm:block">{APP_DESCRIPTION}</p>
                </div>
            </div>
        </header>
    );
}
