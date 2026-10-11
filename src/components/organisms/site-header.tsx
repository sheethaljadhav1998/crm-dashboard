import { Logo } from "@/components/atoms/logo";
import { APP_DESCRIPTION, APP_NAME } from "@/constants";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-30 bg-linear-to-br from-[#14476d] to-[#22388f] text-white shadow-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
                <Logo />
                <div className="min-w-0">
                    <h1 className="truncate text-base font-bold leading-tight tracking-tight sm:text-lg">{APP_NAME}</h1>
                    <p className="hidden truncate text-xs text-sky-200 sm:block">{APP_DESCRIPTION}</p>
                </div>
            </div>
        </header>
    );
}
