import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n.js";
import ContextProvider from "./contexts/MyContext.tsx";
import { BarProvider } from "./contexts/BarContext.tsx";
import { CompareProvider } from "./contexts/CompareContext.tsx";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ContextProvider>
          <BarProvider>
            <CompareProvider>
              <App />
            </CompareProvider>
          </BarProvider>
        </ContextProvider>
        Ì
      </LanguageProvider>
    </QueryClientProvider>
  </StrictMode>
);
