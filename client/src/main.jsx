import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";
import { Toaster } from "./components/ui/toaster";

axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}`;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);
