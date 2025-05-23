import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CryptoProvider } from "./CryptoContext";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // ✅ MUI theme

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}> 
        <CryptoProvider>
          <App />
        </CryptoProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
