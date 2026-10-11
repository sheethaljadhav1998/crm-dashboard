import { Label } from "@/components/atoms/label";

type Props = {
    id: string;
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
};

export function FormField({ id, label, required, error, children }: Props) {
    return (
        <div className="space-y-1.5">
            <Label htmlFor={id}>
                {label} {required && <span className="text-destructive">*</span>}
            </Label>
            {children}
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
