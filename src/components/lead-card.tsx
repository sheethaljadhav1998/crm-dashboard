"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Lead } from "@/types/lead";

export function LeadCard({ lead, index = 0 }: { lead: Lead; index?: number }) {
  const fullName = `${lead.first_name} ${lead.last_name}`;
  const initials = `${lead.first_name[0] ?? ""}${lead.last_name[0] ?? ""}`.toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      layout
    >
      <Card className="group transition-all hover:-translate-y-0.5 hover:shadow-lg">
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="flex items-center gap-4">
            <Avatar className="size-14 ring-2 ring-background shadow">
              <AvatarImage src={lead.avatar} alt={fullName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h3 className="truncate font-semibold leading-tight">{fullName}</h3>
              <Badge variant="secondary" className="mt-1.5">
                {lead.job}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="size-4 shrink-0" />
            <a href={`mailto:${lead.email}`} className="truncate hover:text-foreground hover:underline">
              {lead.email}
            </a>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}