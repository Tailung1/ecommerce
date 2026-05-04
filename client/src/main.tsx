import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ContextProvider from "./contexts/MyContext.tsx";
import { BarProvider } from "./contexts/BarContext.tsx";
import { CompareProvider } from "./contexts/CompareContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <BarProvider>
        <CompareProvider>
          <App />
        </CompareProvider>
      </BarProvider>
    </ContextProvider>
  </StrictMode>
);
