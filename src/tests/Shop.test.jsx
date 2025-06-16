import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Shop from "../routes/Shop";
import { vi } from "vitest";

const mockHandleCart = vi.fn();

vi.mock("react-router-dom", () => ({
  useOutletContext: () => ({
    products: [{ id: 1, title: "Product", price: 10 }],
    handleCart: mockHandleCart
  }),
}));

test("renders products and adds to cart", async () => {
  render(<Shop />);

  expect(screen.getByText(/Product/i)).toBeInTheDocument();

  const addToCartButton = screen.getByRole("button", { name: /Add to Cart/i });
  await userEvent.click(addToCartButton);

  expect(mockHandleCart).toHaveBeenCalledWith(expect.objectContaining({
    id: 1,
    title: "Product"
  }), expect.any(Number));
});