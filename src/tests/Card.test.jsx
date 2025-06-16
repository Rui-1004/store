import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../components/Card";
import { beforeEach, expect } from "vitest";

const product = {
  id: 1,
  image: "https://example.com/image.png",
  title: "Product",
  price: 5
};

const mockHandleCart = vi.fn();

beforeEach(() => {
  render(<Card product={product} handleCart={mockHandleCart} />);
});

test("renders product title, image and price", () => {
  expect(screen.getByRole("img")).toHaveAttribute("src", product.image);
  expect(screen.getByText("Product")).toBeInTheDocument();
  expect(screen.getByText("5.00€")).toBeInTheDocument();
});

test("starts with quantity 1 and decrement button disabled", () => {
  expect(screen.getByRole("spinbutton")).toHaveValue(1);
  expect(screen.getByRole("button", {name: "-"})).toBeDisabled();
});

test("increments quantity when + is clicked", async () => {
  const increment = screen.getByRole("button", {name: "+"});

  await userEvent.click(increment);
  expect(screen.getByRole("spinbutton")).toHaveValue(2);
});

test("decrements quantity when - is clicked", async () => {
  const decrement = screen.getByRole("button", {name: "-"});
  const increment = screen.getByRole("button", {name: "+"});

  await userEvent.click(increment);
  await userEvent.click(decrement);
  expect(screen.getByRole("spinbutton")).toHaveValue(1);
});

test("validates input on blur, by resetting invalid value to 1", async () => {
  const input = screen.getByRole("spinbutton");

  await userEvent.type(input, ".1");
  await userEvent.tab();
  expect(input).toHaveValue(1);
});

test("calls handleCart with correct data", async () => {
  const button = screen.getByText(/Add To Cart/i);
  await userEvent.click(button);

  expect(mockHandleCart).toHaveBeenCalledWith(
    expect.objectContaining({ id: 1, title: "Product" }),
    1
  )
});

test("calls handleCart with correct quantity", async () => {
  const input = screen.getByRole("spinbutton");
  await userEvent.clear(input);
  await userEvent.type(input, "3");
  await userEvent.tab();

  const button = screen.getByText(/Add To Cart/i);
  await userEvent.click(button);

  expect(mockHandleCart).toHaveBeenCalledWith(
    expect.any(Object),
    3
  );
});