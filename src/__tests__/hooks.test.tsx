import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createLead, deleteLead, getLeads, patchLead, updateLead } from "@/lib/api";
import { useCreateLead, useDeleteLead, useLeads, useUpdateJob, useUpdateLead } from "@/hooks";
import type { Lead } from "@/types";

jest.mock("@/lib/api");

const george: Lead = { id: 1, first_name: "George", last_name: "Bluth", email: "g@reqres.in", avatar: "", job: "Designer" };
const janet: Lead = { id: 2, first_name: "Janet", last_name: "Weaver", email: "j@reqres.in", avatar: "", job: "CEO / Founder" };

function setup() {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
    return renderHook(
        () => ({
            leads: useLeads(),
            create: useCreateLead(),
            update: useUpdateLead(),
            updateJob: useUpdateJob(),
            remove: useDeleteLead(),
        }),
        { wrapper }
    );
}

async function setupLoaded() {
    const hook = setup();
    await waitFor(() => expect(hook.result.current.leads.data).toEqual([george, janet]));
    return hook;
}

beforeEach(() => {
    jest.mocked(getLeads).mockResolvedValue([george, janet]);
    jest.mocked(updateLead).mockResolvedValue();
    jest.mocked(patchLead).mockResolvedValue();
    jest.mocked(deleteLead).mockResolvedValue();
});

it("loads leads from the API", async () => {
    const { result } = await setupLoaded();
    expect(result.current.leads.data).toEqual([george, janet]);
});

it("shows a created lead at the top of the list", async () => {
    const created: Lead = { ...janet, id: "99", first_name: "New" };
    jest.mocked(createLead).mockResolvedValue(created);
    const { result } = await setupLoaded();

    await act(() => result.current.create.mutateAsync({ first_name: "New", last_name: "Weaver", email: "j@reqres.in" }));

    await waitFor(() => expect(result.current.leads.data).toEqual([created, george, janet]));
});

it("shows edits, job changes and deletes right away", async () => {
    const { result } = await setupLoaded();

    await act(() =>
        result.current.update.mutateAsync({
            id: 1,
            input: { first_name: "Georgie", last_name: "Bluth", email: "g@reqres.in", job: "" },
        })
    );
    await act(() => result.current.updateJob.mutateAsync({ id: 2, job: "Designer" }));

    await waitFor(() =>
        expect(result.current.leads.data).toEqual([
            { ...george, first_name: "Georgie", job: "Not specified" },
            { ...janet, job: "Designer" },
        ])
    );

    await act(() => result.current.remove.mutateAsync(1));
    await waitFor(() => expect(result.current.leads.data).toEqual([{ ...janet, job: "Designer" }]));
});

it("replaces local changes with the API response on refetch", async () => {
    jest.mocked(createLead).mockResolvedValue({ ...janet, id: "99" });
    const { result } = await setupLoaded();

    await act(() => result.current.create.mutateAsync({ first_name: "Janet", last_name: "Weaver", email: "j@reqres.in" }));
    await act(() => result.current.updateJob.mutateAsync({ id: 1, job: "CEO / Founder" }));
    await act(() => result.current.remove.mutateAsync(2));
    await act(() => result.current.leads.refetch());

    await waitFor(() => expect(result.current.leads.data).toEqual([george, janet]));
});
