import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("<App/>", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("should render table headers", () => {
    expect(screen.getByText("First Name")).toBeVisible();
    expect(screen.getByText("Last name")).toBeVisible();
    expect(screen.getByText("Phone number")).toBeVisible();
  });

  test("should render placeholders", () => {
    expect(screen.getByText("Enter first name")).toBeVisible();
    expect(screen.getByText("Enter last name")).toBeVisible();
    expect(screen.getByText("Enter phone number")).toBeVisible();
    expect(screen.getByText("Add to contacts")).toBeVisible();
  });

  test("should enable add-to-contact-button", () => {
    const firstNameInput = screen.getByTestId("first-name-label");
    fireEvent.change(firstNameInput, { target: { value: "user1" } });
    const phoneNumberInput = screen.getByTestId("phone-number-label");
    fireEvent.change(phoneNumberInput, { target: { value: 4789652 } });
    expect(screen.getByText("Add to contacts")).toBeEnabled();
  });

  test("should create a contact", () => {
    const firstNameInput = screen.getByTestId("first-name-label");
    fireEvent.change(firstNameInput, { target: { value: "user1" } });
    const phoneNumberInput = screen.getByTestId("phone-number-label");
    fireEvent.change(phoneNumberInput, { target: { value: 4789652 } });
    const btn = screen.getByText("Add to contacts");
    fireEvent.click(btn);
    expect(screen.getByText("user1")).toBeVisible();
    expect(screen.getByText("4789652")).toBeVisible();
  });
});
