import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Main from "./src/pages/Main";
import Product from "./src/pages/searching/Product";

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
    ],
  },
]);

export default router;
