import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Header } from "./components/layout/header.tsx";
import Footer from "./components/layout/footer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Header />
      <App />
      <Footer />
    </ThemeProvider>
  </StrictMode>
);
