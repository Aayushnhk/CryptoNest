import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";
import { keyframes } from "@mui/system";

const moveLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = [...trending, ...trending].map((coin, index) => {
    const profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link
        key={`${coin.id}-${index}`}
        to={`/coins/${coin.id}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          textTransform: "uppercase",
          cursor: "pointer",
          minWidth: 180,
          margin: "0 16px",
          padding: "12px 16px",
          borderRadius: "12px",
          transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
            background: "linear-gradient(135deg, rgba(30, 30, 30, 0.8), rgba(50, 50, 50, 0.8))",
          }
        }}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="60"
          style={{
            marginBottom: 10,
            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))",
            transition: "transform 0.3s ease"
          }}
        />
        <Box sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "4px"
        }}>
          <span style={{
            fontWeight: 600,
            fontSize: "1em",
            letterSpacing: "0.5px"
          }}>
            {coin?.symbol}
          </span>
          <span
            style={{
              color: profit ? "rgb(14, 203, 129)" : "rgb(255, 80, 80)",
              fontWeight: 600,
              fontSize: "0.85em",
              marginLeft: "6px",
              display: "inline-flex",
              alignItems: "center"
            }}
          >
            {typeof coin?.price_change_percentage_24h === "number"
              ? `${profit ? "▲" : "▼"} ${coin.price_change_percentage_24h.toFixed(2)}%`
              : "N/A"}
          </span>
        </Box>
        <span style={{
          fontSize: "1.1em",
          fontWeight: 600,
          color: "#f1f1f1",
          textShadow: "0 2px 4px rgba(0,0,0,0.2)"
        }}>
          {coin?.current_price
            ? `${symbol} ${numberWithCommas(coin.current_price.toFixed(2))}`
            : "N/A"}
        </span>
      </Link>
    );
  });

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        zIndex: 10,
        padding: "16px 0",
        "&:hover .marquee": {
          animationPlayState: "paused"
        },
        background: "transparent",
        borderTop: "none",
        borderBottom: "none",
      }}
    >
      <Box
        className="marquee"
        sx={{
          display: "inline-flex",
          animation: `${moveLeft} 25s linear infinite`,
          "&:hover": {
            animationPlayState: "paused"
          }
        }}
      >
        {items}
      </Box>
    </Box>
  );
};

export default Carousel;
