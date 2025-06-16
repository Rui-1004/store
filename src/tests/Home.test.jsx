import { render, screen } from "@testing-library/react";
import Home from "../routes/Home";

test("renders the homepage", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
});