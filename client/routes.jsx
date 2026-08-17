import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./src/pages/main/Home/Home";
import Product from "./src/pages/main/product/Product";
import Products from "./src/pages/main/products/Products";
import Cart from "./src/pages/main/shoppingCart/ShoppingCart";
import Compare from "./src/features/compare/Compare";
import Promotions from "./src/pages/main/promotions/Promotions";
import SearchBar from "./src/pages/main/searchBar/SearchBar";
import LanguageLayout from "./src/LanguageLayout";

const shopRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "search",
    element: <SearchBar />,
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
