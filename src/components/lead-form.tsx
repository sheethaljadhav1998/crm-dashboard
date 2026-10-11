"use client";

import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JobSelect } from "@/components/job-select";
import { EMPTY_LEAD_FORM } from "@/constants";
import { leadSchema, type LeadInput } from "@/lib/schemas";

type Props = {
    defaultValues?: LeadInput;
    submitLabel: string;
    pending: boolean;
    onSubmit: (values: LeadInput) => void;
};

function Field({ id, label, required, error, children }: {
    id: string;
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
}) {
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

export function LeadForm({ defaultValues = EMPTY_LEAD_FORM, submitLabel, pending, onSubmit }: Props) {
    const id = useId();
    const { register, handleSubmit, control, formState: { errors } } = useForm<LeadInput>({
        resolver: zodResolver(leadSchema),
        mode: "onBlur",
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <Field id={`${id}-first`} label="First Name" required error={errors.first_name?.message}>
                    <Input id={`${id}-first`} placeholder="Jane" aria-invalid={!!errors.first_name} {...register("first_name")} />
                </Field>
                <Field id={`${id}-last`} label="Last Name" required error={errors.last_name?.message}>
                    <Input id={`${id}-last`} placeholder="Doe" aria-invalid={!!errors.last_name} {...register("last_name")} />
                </Field>
            </div>

            <Field id={`${id}-email`} label="Email" required error={errors.email?.message}>
                <Input
                    id={`${id}-email`}
                    type="email"
                    placeholder="jane@company.com"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                />
            </Field>

            <Field id={`${id}-job`} label="Job Title" error={errors.job?.message}>
                <Controller
                    control={control}
                    name="job"
                    render={({ field }) => (
                        <JobSelect
                            id={`${id}-job`}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            invalid={!!errors.job}
                        />
                    )}
                />
            </Field>

            <Button type="submit" className="w-full" disabled={pending}>
                {pending ? <><Loader2 className="size-4 animate-spin" /> Saving…</> : submitLabel}
            </Button>
        </form>
    );
}
