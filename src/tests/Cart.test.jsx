import { render, screen } from "@testing-library/react";
import Cart from "../routes/Cart";
import { vi } from "vitest";

const mockHandleTotal = vi.fn();

vi.mock("react-router-dom", () => ({
  useOutletContext: () => ({
    cart: [
      { id: 1, title: "Product One", price: 20, quantity: 2 },
      { id: 2, title: "Product Two", price: 15, quantity: 1 },
    ],
    handleTotal: mockHandleTotal,
    cartTotal: { price: 55, quantity: 3 },
  }),
}));

test("renders cart items", () => {
  render(<Cart />);
  expect(screen.getByText(/Product One/i)).toBeInTheDocument();
  expect(screen.getByText(/Product Two/i)).toBeInTheDocument();
});

test("renders total price", () => {
  render(<Cart />);

  expect(screen.getByText(/55.00\€/)).toBeInTheDocument();
});