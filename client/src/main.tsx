import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ContextProvider from "./contexts/MyContext.tsx";
import { BarProvider } from "./contexts/BarContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <BarProvider>
        <App />
      </BarProvider>
    </ContextProvider>
  </StrictMode>
);
