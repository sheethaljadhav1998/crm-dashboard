"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import {
    AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteLead } from "@/hooks";
import type { Lead } from "@/types";

export function DeleteLeadDialog({ lead }: { lead: Lead }) {
    const [open, setOpen] = useState(false);
    const del = useDeleteLead();

    return (
        <AlertDialog open={open} onOpenChange={(v) => !del.isPending && setOpen(v)}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full bg-card/80 text-destructive shadow-xs backdrop-blur-sm hover:bg-card hover:text-destructive"
                    aria-label="Delete lead"
                    title="Delete"
                >
                    <Trash2 className="size-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete this lead?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {lead.first_name} {lead.last_name} will be removed from your pipeline.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={del.isPending}>Cancel</AlertDialogCancel>
                    <Button
                        variant="destructive"
                        disabled={del.isPending}
                        onClick={() => del.mutate(lead.id, { onSuccess: () => setOpen(false) })}
                    >
                        {del.isPending ? <><Loader2 className="size-4 animate-spin" /> Deleting…</> : "Delete"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}