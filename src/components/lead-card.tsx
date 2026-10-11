"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { JobSelect } from "@/components/job-select";
import { EditLeadDialog } from "@/components/lead-edit-dialog";
import { DeleteLeadDialog } from "@/components/lead-delete-dialog";
import { NO_JOB } from "@/constants";
import { useUpdateJob } from "@/hooks";
import type { Lead } from "@/types";
import { getFullName, getInitials } from "@/utils";

function QuickJobEdit({ lead }: { lead: Lead }) {
    const updateJob = useUpdateJob();
    return (
        <JobSelect
            value={lead.job === NO_JOB ? "" : lead.job}
            disabled={updateJob.isPending}
            onChange={(job) => updateJob.mutate({ id: lead.id, job })}
            className="h-9 w-full border-transparent bg-muted text-sm hover:bg-secondary"
        />
    );
}

export function LeadCard({ lead, index = 0 }: { lead: Lead; index?: number }) {
    const fullName = getFullName(lead);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            layout
        >
            <Card className="h-full gap-0 rounded-2xl py-0 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:ring-primary/30">
                <div className="relative h-20 bg-linear-to-br from-secondary via-accent to-chart-3/40">
                    <div className="absolute right-2 top-2 flex items-center gap-1">
                        <EditLeadDialog lead={lead} />
                        <DeleteLeadDialog lead={lead} />
                    </div>
                </div>

                <CardContent className="flex flex-1 flex-col gap-4 px-5 pb-5">
                    <Avatar className="-mt-10 size-20 shadow-md ring-4 ring-card">
                        <AvatarImage src={lead.avatar} alt={fullName} />
                        <AvatarFallback className="bg-secondary text-lg font-semibold text-primary">
                            {getInitials(lead)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 space-y-1">
                        <h3 className="truncate text-lg font-bold leading-tight tracking-tight">{fullName}</h3>
                        <a
                            href={`mailto:${lead.email}`}
                            className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                            <Mail className="size-3.5 shrink-0" />
                            <span className="truncate">{lead.email}</span>
                        </a>
                    </div>

                    <div className="mt-auto space-y-1.5 border-t pt-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Job title
                        </p>
                        <QuickJobEdit lead={lead} />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}