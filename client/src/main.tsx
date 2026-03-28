import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./css/header/header-output.css";
import "./css/main/main-output.css";
import "./css/footer/footer-output.css";
import "./css/btn-nav/nav-output.css";
import "./css/bar-shared.scss";
import App from "./App.tsx";
import ContextProvider from "./MyContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>
);
