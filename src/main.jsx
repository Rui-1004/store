import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './routes/Root';
import Home from './routes/Home';
import Shop from './routes/Shop';
import Error from './routes/Error';
import Cart from './routes/Cart';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home />},
      { path: "shop", element: <Shop />},
      { path: "cart", element: <Cart />},
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)