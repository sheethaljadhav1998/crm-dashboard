"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { leadSchema, type LeadFormValues } from "@/lib/schemas";
import { useCreateLead } from "@/hooks/use-create-lead";

function Field({
    id,
    label,
    required,
    error,
    children,
}: {
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
            {error && (
                <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
}

export function LeadFormDialog() {
    const [open, setOpen] = useState(false);
    const create = useCreateLead();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LeadFormValues>({
        resolver: zodResolver(leadSchema),
        mode: "onBlur", // validate on blur, then re-validate on change after first submit
        defaultValues: { first_name: "", last_name: "", email: "", job: "" },
    });

    const onSubmit = (values: LeadFormValues) => {
        if (create.isPending) return; // guard against double submission
        create.mutate(values, {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                setOpen(v);
                if (!v) reset();
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 sm:flex-none">
                    <Plus className="size-4" /> Add Lead
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add a new lead</DialogTitle>
                    <DialogDescription>Fields marked * are required.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field id="first_name" label="First Name" required error={errors.first_name?.message}>
                            <Input
                                id="first_name"
                                placeholder="Jane"
                                aria-invalid={!!errors.first_name}
                                {...register("first_name")}
                            />
                        </Field>
                        <Field id="last_name" label="Last Name" required error={errors.last_name?.message}>
                            <Input
                                id="last_name"
                                placeholder="Doe"
                                aria-invalid={!!errors.last_name}
                                {...register("last_name")}
                            />
                        </Field>
                    </div>

                    <Field id="email" label="Email" required error={errors.email?.message}>
                        <Input
                            id="email"
                            type="email"
                            placeholder="jane@company.com"
                            aria-invalid={!!errors.email}
                            {...register("email")}
                        />
                    </Field>

                    <Field id="job" label="Job Title" error={errors.job?.message}>
                        <Input
                            id="job"
                            placeholder="Sales Manager"
                            aria-invalid={!!errors.job}
                            {...register("job")}
                        />
                    </Field>

                    <Button type="submit" className="w-full" disabled={create.isPending}>
                        {create.isPending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" /> Saving…
                            </>
                        ) : (
                            "Add Lead"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}