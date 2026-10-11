"use client";

import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { FormField } from "@/components/molecules/form-field";
import { JobSelect } from "@/components/molecules/job-select";
import { EMPTY_LEAD_FORM } from "@/constants";
import { leadSchema, type LeadInput } from "@/lib/schemas";

type Props = {
    defaultValues?: LeadInput;
    submitLabel: string;
    pending: boolean;
    onSubmit: (values: LeadInput) => void;
};

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
                <FormField id={`${id}-first`} label="First Name" required error={errors.first_name?.message}>
                    <Input id={`${id}-first`} placeholder="Jane" aria-invalid={!!errors.first_name} {...register("first_name")} />
                </FormField>
                <FormField id={`${id}-last`} label="Last Name" required error={errors.last_name?.message}>
                    <Input id={`${id}-last`} placeholder="Doe" aria-invalid={!!errors.last_name} {...register("last_name")} />
                </FormField>
            </div>

            <FormField id={`${id}-email`} label="Email" required error={errors.email?.message}>
                <Input
                    id={`${id}-email`}
                    type="email"
                    placeholder="jane@company.com"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                />
            </FormField>

            <FormField id={`${id}-job`} label="Job Title" error={errors.job?.message}>
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
            </FormField>

            <Button type="submit" className="w-full" disabled={pending}>
                {pending ? <><Loader2 className="size-4 animate-spin" /> Saving…</> : submitLabel}
            </Button>
        </form>
    );
}
