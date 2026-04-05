import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import "./css/header/header.scss";
import "./css/main/main.scss";
import "./css/footer/footer.scss";
import "./css/btn-nav/nav.scss";
import "./css/shared/shared.scss";

import App from "./App.tsx";
import ContextProvider from "./MyContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>
);
