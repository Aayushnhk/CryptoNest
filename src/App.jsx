import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { styled } from "@mui/system";
import Homepage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

const AppWrapper = styled("div")({
  backgroundColor: "#2B2B2B",
  color: "white",
  minHeight: "100vh",
});

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <AppWrapper>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;
