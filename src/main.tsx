import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const USE_MSW = import.meta.env.VITE_USE_MSW === "true";

if (USE_MSW) {
  const { worker } = await import("./mocks/browser");
  await worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
