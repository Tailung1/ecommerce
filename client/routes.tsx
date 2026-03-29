import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Main from "./src/pages/main-section/Main";
import Product from "./src/pages/searching/Product";
import Products from "./src/pages/searching/Products";
import Cart from "./src/pages/cart/Cart";
import Compare from "./src/bottomNAV/Compare";
import Promotions from "./src/bottomNAV/Promotions";
import SearchBar from "./src/pages/SearchBar";

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
        element: <SearchBar />,
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
