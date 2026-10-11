import { AVATAR_BASE_URL, JOB_TITLES, NO_JOB } from "@/constants";
import type { Lead } from "@/types";
import { filterLeads, getAvatarUrl, getFullName, getInitials, mapUserToLead, toJob } from "@/utils";

const lead = (id: number, first_name = `Lead ${id}`, job = "Designer"): Lead => ({
    id,
    first_name,
    last_name: "Test",
    email: `lead${id}@example.com`,
    avatar: "",
    job,
});

describe("toJob", () => {
    it("trims the job title", () => {
        expect(toJob("  Designer ")).toBe("Designer");
    });

    it("uses a placeholder for empty titles", () => {
        expect(toJob("")).toBe(NO_JOB);
        expect(toJob("   ")).toBe(NO_JOB);
        expect(toJob(undefined)).toBe(NO_JOB);
    });
});

describe("names and avatars", () => {
    it("builds the full name and initials", () => {
        const name = { first_name: "george", last_name: "bluth" };
        expect(getFullName(name)).toBe("george bluth");
        expect(getInitials(name)).toBe("GB");
    });

    it("handles empty names", () => {
        expect(getInitials({ first_name: "", last_name: "" })).toBe("");
    });

    it("builds an encoded avatar url", () => {
        expect(getAvatarUrl("Jane Doe")).toBe(`${AVATAR_BASE_URL}?seed=Jane%20Doe`);
    });
});

describe("mapUserToLead", () => {
    it("maps an API user to a lead with a job title", () => {
        const user = { id: 2, first_name: "Janet", last_name: "Weaver", email: "j@reqres.in", avatar: "a.png" };
        expect(mapUserToLead(user)).toEqual({ ...user, job: JOB_TITLES[2] });
    });

    it("fills in missing fields", () => {
        expect(mapUserToLead({ first_name: "Only" })).toEqual({
            id: "",
            first_name: "Only",
            last_name: "",
            email: "",
            avatar: "",
            job: NO_JOB,
        });
        expect(mapUserToLead(undefined).first_name).toBe("");
    });
});

describe("filterLeads", () => {
    const leads = [lead(1, "George", "Sales Manager"), lead(2, "Janet", "Designer")];

    it("matches name, email or job title, ignoring case and spaces", () => {
        expect(filterLeads(leads, " GEORGE ").map((l) => l.id)).toEqual([1]);
        expect(filterLeads(leads, "lead2@").map((l) => l.id)).toEqual([2]);
        expect(filterLeads(leads, "designer").map((l) => l.id)).toEqual([2]);
    });

    it("returns every lead for an empty query", () => {
        expect(filterLeads(leads, "")).toEqual(leads);
    });
});