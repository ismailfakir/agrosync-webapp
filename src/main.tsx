import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GlobalAlertProvider } from "./components/GlobalAlertProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalAlertProvider stackDirection="down">
      <App />
    </GlobalAlertProvider>
  </StrictMode>,
);
