"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
import { useCreateLead } from "@/hooks";

export function LeadFormDialog({ className }: { className?: string }) {
    const [open, setOpen] = useState(false);
    const create = useCreateLead();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className={className}>
                    <Plus className="size-4" /> Add Lead
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add a new lead</DialogTitle>
                    <DialogDescription>Fields marked * are required.</DialogDescription>
                </DialogHeader>
                <LeadForm
                    submitLabel="Add Lead"
                    pending={create.isPending}
                    onSubmit={(values) => create.mutate(values, { onSuccess: () => setOpen(false) })}
                />
            </DialogContent>
        </Dialog>
    );
}
