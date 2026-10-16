import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { initAnalytics } from "@/lib/analytics.ts"

initAnalytics()

// Register the offline service worker for installable PWA support.
// Only in production so the dev server is never shadowed by a cache.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .catch(() => {
        // Offline support is a progressive enhancement; ignore failures.
      })
  })
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="afnan-portfolio-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
)
