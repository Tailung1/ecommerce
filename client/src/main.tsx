import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import "./css/header/header.scss";
// import "./css/main-css/main.scss";
// import "./css/footer-css/footer.scss";
// import "./css/btn-nav-css/nav.scss";
// import "./css/shared-css/shared.scss";
import "./css/reusable-css/bar.scss"

import App from "./App.tsx";
import ContextProvider from "./MyContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>
);
