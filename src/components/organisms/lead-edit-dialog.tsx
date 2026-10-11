"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/atoms/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/atoms/dialog";
import { LeadForm } from "@/components/organisms/lead-form";
import { NO_JOB } from "@/constants";
import { useUpdateLead } from "@/hooks";
import type { Lead } from "@/types";

export function EditLeadDialog({ lead }: { lead: Lead }) {
    const [open, setOpen] = useState(false);
    const update = useUpdateLead();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full bg-card/80 shadow-xs backdrop-blur-sm hover:bg-card hover:text-primary"
                    aria-label="Edit lead"
                    title="Edit"
                >
                    <Pencil className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit lead</DialogTitle>
                    <DialogDescription>Update this lead&apos;s details.</DialogDescription>
                </DialogHeader>
                <LeadForm
                    defaultValues={{
                        first_name: lead.first_name,
                        last_name: lead.last_name,
                        email: lead.email,
                        job: lead.job === NO_JOB ? "" : lead.job,
                    }}
                    submitLabel="Save changes"
                    pending={update.isPending}
                    onSubmit={(input) => update.mutate({ id: lead.id, input }, { onSuccess: () => setOpen(false) })}
                />
            </DialogContent>
        </Dialog>
    );
}
