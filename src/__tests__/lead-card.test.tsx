import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LeadCard } from "@/components/lead-card";
import { NO_JOB } from "@/constants";
import type { Lead } from "@/types";

const lead: Lead = {
    id: 1,
    first_name: "George",
    last_name: "Bluth",
    email: "george@reqres.in",
    avatar: "",
    job: "Sales Manager",
};

function renderCard(props: Lead) {
    return render(
        <QueryClientProvider client={new QueryClient()}>
            <LeadCard lead={props} />
        </QueryClientProvider>
    );
}

it("shows the lead's name, initials, email and job title", () => {
    renderCard(lead);

    expect(screen.getByRole("heading", { name: "George Bluth" })).toBeInTheDocument();
    expect(screen.getByText("GB")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /george@reqres.in/ })).toHaveAttribute("href", "mailto:george@reqres.in");
    expect(screen.getByRole("combobox")).toHaveTextContent("Sales Manager");
});

it("shows the job placeholder when no title is set", () => {
    renderCard({ ...lead, job: NO_JOB });
    expect(screen.getByRole("combobox")).toHaveTextContent("Select a job title");
});

it("has edit and delete buttons", () => {
    renderCard(lead);
    expect(screen.getByRole("button", { name: "Edit lead" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete lead" })).toBeInTheDocument();
});
