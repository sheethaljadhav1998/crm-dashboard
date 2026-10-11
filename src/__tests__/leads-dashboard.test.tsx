import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LeadsDashboard } from "@/components/organisms/leads-dashboard";
import { getLeads } from "@/lib/api";
import type { Lead } from "@/types";

jest.mock("@/lib/api");

const leads: Lead[] = [
    { id: 1, first_name: "George", last_name: "Bluth", email: "george@reqres.in", avatar: "", job: "Sales Manager" },
    { id: 2, first_name: "Janet", last_name: "Weaver", email: "janet@reqres.in", avatar: "", job: "Designer" },
];

function renderDashboard() {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return render(
        <QueryClientProvider client={client}>
            <LeadsDashboard />
        </QueryClientProvider>
    );
}

it("shows the leads returned by the API", async () => {
    jest.mocked(getLeads).mockResolvedValue(leads);
    renderDashboard();

    expect(await screen.findByText("George Bluth")).toBeInTheDocument();
    expect(screen.getByText("Janet Weaver")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /george@reqres.in/ })).toHaveAttribute("href", "mailto:george@reqres.in");
});

it("filters leads by name, email or job title", async () => {
    jest.mocked(getLeads).mockResolvedValue(leads);
    renderDashboard();
    await screen.findByText("George Bluth");

    const search = screen.getByPlaceholderText(/search by name/i);
    await userEvent.type(search, "designer");

    await waitForElementToBeRemoved(() => screen.queryByText("George Bluth"));
    expect(screen.getByText("Janet Weaver")).toBeInTheDocument();
});

it("shows an empty state and clears the search", async () => {
    jest.mocked(getLeads).mockResolvedValue(leads);
    renderDashboard();
    await screen.findByText("George Bluth");

    await userEvent.type(screen.getByPlaceholderText(/search by name/i), "nobody");
    expect(screen.getByText("No matching leads")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Clear search"));
    expect(await screen.findByText("George Bluth")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search by name/i)).toHaveValue("");
});

it("shows an error state when loading fails", async () => {
    jest.mocked(getLeads).mockRejectedValue(new Error("Network down"));
    renderDashboard();

    expect(await screen.findByText("Couldn't load leads")).toBeInTheDocument();
    expect(screen.getByText("Network down")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
});
