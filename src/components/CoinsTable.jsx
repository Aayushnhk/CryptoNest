import React, { useEffect, useState } from "react";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#FFD700" },
      background: {
        default: "#1e1e1e",
        paper: "#2b2b2b",
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
      setCoins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () =>
    coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

  const searchedCoins = handleSearch();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center", paddingBottom: 4 }}>
              <Typography
          variant="h4"
          sx={{
            marginY: 3,
            fontWeight: 200,
            color: "#fff",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>


        <TextField
          label="Search for a cryptocurrency..."
          variant="outlined"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            marginBottom: 3,
            input: {
              color: "#fff",
              backgroundColor: "#1e1e1e",
              borderRadius: 1,
            },
            label: { color: "#aaa" },
          }}
        />

        <TableContainer component={Paper} sx={{ backgroundColor: "#2b2b2b" }}>
          {loading ? (
            <LinearProgress sx={{ backgroundColor: "#FFD700" }} />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                      sx={{
                        color: "#FFD700",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        fontFamily: "Poppins",
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {searchedCoins
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        key={row.id}
                        hover
                        onClick={() => navigate(`/coins/${row.id}`)}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#1c1c1c",
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                            <img src={row.image} alt={row.name} height="40" />
                            <div>
                              <Typography sx={{ textTransform: "uppercase", fontWeight: 600 }}>
                                {row.symbol}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {row.name}
                              </Typography>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color: profit ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={Math.ceil(searchedCoins.length / 10)}
          color="primary"
          sx={{
            marginTop: 3,
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              color: "#FFD700",
            },
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scrollTo({ top: 450, behavior: "smooth" });
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
