import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  await worker.start({
    serviceWorker: {
      // สำหรับ Vite: ไฟล์อยู่ใน public/ => เสิร์ฟที่ /mockServiceWorker.js
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      // ถ้าไม่ได้ตั้ง base อะไรพิเศษ ใช้ "/mockServiceWorker.js" ตรง ๆ ก็ได้
      // url: "/mockServiceWorker.js",
    },
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
