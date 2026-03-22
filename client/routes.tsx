import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Main from "./src/pages/Main";
import Product from "./src/pages/searching/Product";
import Products from "./src/pages/searching/Products";
import Cart from "./src/pages/cart/Cart";
import Compare from "./src/pages/footer-section/Compare";
import Promotions from "./src/pages/footer-section/Promotions";

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
        element: <Products />,
      },
      {
        path: "/:category/:id",
        element: <Product />,
      },

      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/promotions",
        element: <Promotions />,
      },
      {
        path: "/compare-products",
        element: <Compare />,
      },
    ],
  },
]);

export default router;
