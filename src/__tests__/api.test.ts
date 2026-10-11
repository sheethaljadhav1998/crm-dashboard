import { createLead, deleteLead, getLeads, patchLead, updateLead } from "@/lib/api";
import { JOB_TITLES, NO_JOB } from "@/constants";

const fetchMock = jest.fn();

const respond = (status: number, body?: unknown) =>
    fetchMock.mockResolvedValueOnce({
        ok: status >= 200 && status < 300,
        status,
        json: async () => body,
    });

beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock;
});

const input = { first_name: "Jane", last_name: "Doe", email: "jane@doe.com", job: "" };

describe("getLeads", () => {
    it("maps users to leads with a job title", async () => {
        respond(200, {
            data: [{ id: 1, first_name: "George", last_name: "Bluth", email: "g@b.com", avatar: "a.png" }],
        });

        const leads = await getLeads();

        expect(fetchMock.mock.calls[0][0]).toBe("/api/users?page=1");
        expect(leads).toEqual([
            { id: 1, first_name: "George", last_name: "Bluth", email: "g@b.com", avatar: "a.png", job: JOB_TITLES[1] },
        ]);
    });

    it("returns an empty list when the response has no data", async () => {
        respond(200, {});
        expect(await getLeads()).toEqual([]);
        respond(200, null);
        expect(await getLeads()).toEqual([]);
    });

    it("throws when the request fails", async () => {
        respond(500);
        await expect(getLeads()).rejects.toThrow("Could not load leads (500)");
    });
});

describe("createLead", () => {
    it("returns the new lead with the id from the server", async () => {
        respond(201, { id: "42" });

        const lead = await createLead({ ...input, job: "Designer" });

        expect(lead).toMatchObject({ id: "42", first_name: "Jane", job: "Designer" });
        expect(lead.avatar).toContain("seed=Jane%20Doe");
        const [url, init] = fetchMock.mock.calls[0];
        expect(url).toBe("/api/users");
        expect(init.method).toBe("POST");
        expect(JSON.parse(init.body)).toEqual({ ...input, job: "Designer" });
    });

    it("falls back to a placeholder job title", async () => {
        respond(201, { id: "1" });
        expect((await createLead(input)).job).toBe(NO_JOB);
    });

    it("throws when the server rejects the lead", async () => {
        respond(400);
        await expect(createLead(input)).rejects.toThrow("Could not create lead (400)");
    });
});

describe("update, patch and delete", () => {
    it("sends PUT, PATCH and DELETE to the lead url", async () => {
        respond(200);
        respond(200);
        respond(204);

        await updateLead(5, input);
        await patchLead(5, { job: "CEO / Founder" });
        await deleteLead(5);

        expect(fetchMock.mock.calls.map(([url, init]) => [url, init.method])).toEqual([
            ["/api/users/5", "PUT"],
            ["/api/users/5", "PATCH"],
            ["/api/users/5", "DELETE"],
        ]);
    });

    it("throws on server errors", async () => {
        respond(500);
        await expect(updateLead(5, input)).rejects.toThrow("Could not update lead (500)");
        respond(404);
        await expect(deleteLead(5)).rejects.toThrow("Could not delete lead (404)");
    });
});
