import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ContextProvider from "./MyContext";
import { BarProvider } from "../contexts/BarProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <BarProvider>
        {" "}
        <App />
      </BarProvider>
    </ContextProvider>
  </StrictMode>
);
