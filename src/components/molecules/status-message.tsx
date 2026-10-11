import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils";

type Props = {
    icon: LucideIcon;
    title: string;
    description?: string;
    tone?: "default" | "error";
    action?: React.ReactNode;
};

export function StatusMessage({ icon: Icon, title, description, tone = "default", action }: Props) {
    const isError = tone === "error";

    return (
        <div
            className={cn(
                "flex flex-col items-center gap-3 rounded-3xl p-12 text-center",
                isError
                    ? "border border-destructive/20 bg-card shadow-sm"
                    : "border border-dashed border-primary/25 bg-card/60"
            )}
        >
            <div
                className={cn(
                    "flex size-12 items-center justify-center rounded-full",
                    isError ? "bg-destructive/10 text-destructive" : "bg-secondary text-primary"
                )}
            >
                <Icon className="size-6" />
            </div>
            <p className="text-lg font-semibold">{title}</p>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
            {action}
        </div>
    );
}
