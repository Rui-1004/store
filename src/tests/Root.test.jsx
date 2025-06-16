import { render, screen } from '@testing-library/react';
import Root from "../routes/Root";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { afterEach, beforeEach, expect } from 'vitest';

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

beforeEach(() => {
  global.fetch = vi.fn(() => 
    Promise.resolve({
      json: () => Promise.resolve([{id: 1, title: "Product"}])
    })
  );
});

afterEach(() => vi.restoreAllMocks());


test("fetches products on mount", async () => {
  renderWithRouter(<Root />);

  expect(global.fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products?limit=10");
});

test("renders navigation links", () => {
  renderWithRouter(<Root />);

  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Shop/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Checkout/i })).toBeInTheDocument();
});


test("renders Outlet children correctly", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<div data-testid="child">Child Content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByTestId("child")).toBeInTheDocument();
});