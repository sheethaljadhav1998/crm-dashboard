import { z } from "zod";
import { JOB_MAX_LENGTH, NAME_MAX_LENGTH } from "@/constants";

const name = (label: string) =>
    z.string().trim().min(1, `${label} is required`).max(NAME_MAX_LENGTH, `Max ${NAME_MAX_LENGTH} characters`);

export const leadSchema = z.object({
    first_name: name("First name"),
    last_name: name("Last name"),
    email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
    job: z.string().trim().max(JOB_MAX_LENGTH, `Max ${JOB_MAX_LENGTH} characters`).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
