import { render, screen } from "@testing-library/react";
import CartItem from "../components/CartItem";

const item = {
  id: 1,
  image: "https://example.com/image.png",
  title: "Product",
  price: 5,
  quantity: 2
}

test("renders item image, title, price, quantity and total price properly", () => {
  render(<CartItem item={item} />);

  expect(screen.getByRole("img")).toHaveAttribute("src", item.image);
  expect(screen.getByText(/Product/i)).toBeInTheDocument();
  expect(screen.getByText(/5.00\€/)).toBeInTheDocument();
  expect(screen.getByText(/2/)).toBeInTheDocument();
  expect(screen.getByText(/10.00\€/)).toBeInTheDocument();
});