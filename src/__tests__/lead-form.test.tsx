import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadForm } from "@/components/organisms/lead-form";

it("shows validation errors and does not submit an empty form", async () => {
    const onSubmit = jest.fn();
    render(<LeadForm submitLabel="Add Lead" pending={false} onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: "Add Lead" }));

    expect(await screen.findByText("First name is required")).toBeInTheDocument();
    expect(screen.getByText("Last name is required")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
});

it("submits trimmed values", async () => {
    const onSubmit = jest.fn();
    render(<LeadForm submitLabel="Add Lead" pending={false} onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText(/first name/i), " Jane ");
    await userEvent.type(screen.getByLabelText(/last name/i), "Doe");
    await userEvent.type(screen.getByLabelText(/email/i), "jane@doe.com");
    await userEvent.click(screen.getByRole("button", { name: "Add Lead" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({ first_name: "Jane", last_name: "Doe", email: "jane@doe.com", job: "" });
});

it("pre-fills values when editing", () => {
    render(
        <LeadForm
            defaultValues={{ first_name: "George", last_name: "Bluth", email: "george@reqres.in", job: "" }}
            submitLabel="Save changes"
            pending={false}
            onSubmit={jest.fn()}
        />
    );

    expect(screen.getByLabelText(/first name/i)).toHaveValue("George");
    expect(screen.getByLabelText(/email/i)).toHaveValue("george@reqres.in");
});

it("disables the submit button while saving", () => {
    render(<LeadForm submitLabel="Add Lead" pending onSubmit={jest.fn()} />);
    expect(screen.getByRole("button", { name: /saving/i })).toBeDisabled();
});
