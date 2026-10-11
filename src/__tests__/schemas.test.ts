import { leadSchema } from "@/lib/schemas";

const errorsFor = (data: object): Record<string, string> => {
    const result = leadSchema.safeParse(data);
    if (result.success) return {};
    const fields = result.error.flatten().fieldErrors as Record<string, string[]>;
    return Object.fromEntries(Object.entries(fields).map(([key, messages]) => [key, messages[0]]));
};

describe("leadSchema", () => {
    it("accepts a valid lead and trims whitespace", () => {
        const result = leadSchema.parse({ first_name: " Jane ", last_name: "Doe", email: " jane@doe.com " });
        expect(result).toEqual({ first_name: "Jane", last_name: "Doe", email: "jane@doe.com" });
    });

    it("requires first name, last name and email", () => {
        expect(errorsFor({ first_name: " ", last_name: "", email: "" })).toEqual({
            first_name: "First name is required",
            last_name: "Last name is required",
            email: "Email is required",
        });
    });

    it("rejects an invalid email", () => {
        expect(errorsFor({ first_name: "Jane", last_name: "Doe", email: "nope" })).toEqual({
            email: "Enter a valid email address",
        });
    });

    it("limits name length", () => {
        expect(errorsFor({ first_name: "a".repeat(51), last_name: "Doe", email: "j@d.com" })).toEqual({
            first_name: "Max 50 characters",
        });
    });
});