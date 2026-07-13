import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Main from "./src/pages/main/Main/Main";
import Product from "./src/pages/main/Product/Product";
import Products from "./src/pages/main/Products/Products";
import Cart from "./src/pages/main/ShoppingCart/ShoppingCart";
import Compare from "./src/features/Compare/Compare";
import Promotions from "./src/pages/main/Promotions/Promotions";
import Search from "./src/pages/main/SearchBar/SearchBar";
import LanguageLayout from "./src/LanguageLayout";
const shopRoutes = [
  {
    index: true,
    element: <Main />,
  },
  {
    path: "search",
    element: <Search />,
  },
  {
    path: "compare-products",
    element: <Compare />,
  },
  {
    path: "promotions",
    element: <Promotions />,
  },
  {
    path: ":slug",
    element: <Products />,
  },
  {
    path: ":category/:id",
    element: <Product />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
];

const router = createBrowserRouter([
  {
    element: <LanguageLayout />,
    children: [
      {
        element: <Layout />,
        children: shopRoutes,
      },
    ],
  },

  {
    path: "/en",
    element: <LanguageLayout />,
    children: [
      {
        element: <Layout />,
        children: shopRoutes,
      },
    ],
  },
]);

export default router;
