import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./css/header-output.css";
import "./css/main-output.css";
import "./css/footer.scss";
import App from "./App.tsx";
import ContextProvider from "./MyContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>
);
