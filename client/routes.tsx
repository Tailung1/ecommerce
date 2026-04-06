import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Main from "./src/pages/main/Main/Main";
import Product from "./src/pages/main/Product/Product";
import Products from "./src/pages/main/Products/Products";
import Cart from "./src/pages/main/ShoppingCart/ShoppingCart";
import Compare from "./src/features/Compare/Compare";
import Promotions from "./src/pages/main/Promotions/Promotions";
import Search from "./src/pages/main/Search/Search";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/search",
        element: <Search />,
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
