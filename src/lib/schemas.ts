import { z } from "zod";

export const leadSchema = z.object({
    first_name: z.string().trim().min(1, "First name is required").max(50, "Max 50 characters"),
    last_name: z.string().trim().min(1, "Last name is required").max(50, "Max 50 characters"),
    email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
    job: z.string().trim().max(80, "Max 80 characters").optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;