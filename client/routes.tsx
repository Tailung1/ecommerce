import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Main from "./src/pages/Main";
import Product from "./src/pages/searching/Product";
import Cart from "./src/pages/cart/Cart";
import Compare from "./src/features/Compare";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/:slug",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path:"/compare-products",
        element:<Compare />
      }
    ],
  },
]);

export default router;
