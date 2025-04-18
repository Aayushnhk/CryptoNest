import { LinearProgress, Typography, Box, styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: `2px solid ${theme.palette.divider}`, // Use theme for color
}));

const Heading = styled(Typography)({
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Montserrat",
});

const Description = styled(Typography)({
  width: "100%",
  fontFamily: "Montserrat",
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: "justify",
});

const MarketData = styled(Box)(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "flex-start",
  },
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
      // console.log("Coin Data:", data); // Optional: Log the data
    } catch (error) {
      console.error("Failed to fetch coin data:", error);
    }
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Container>
      <Sidebar>
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Heading variant="h3">
          {coin?.name}
        </Heading>
        <Description variant="subtitle1">
          {parse(coin?.description?.en?.split(". ")[0])}.
        </Description>

        <MarketData>
          <Box sx={{ display: "flex" }}>
            <Heading variant="h5">
              Rank:
            </Heading>
            <Box sx={{ ml: 2 }}> {/* Margin Left */}
              <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
                {numberWithCommas(coin?.market_cap_rank)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", mt: 1 }}> {/* Margin Top */}
            <Heading variant="h5">
              Current Price:
            </Heading>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data?.current_price?.[currency.toLowerCase()]
                )}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", mt: 1 }}>
            <Heading variant="h5">
              Market Cap:
            </Heading>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data?.market_cap?.[currency.toLowerCase()]
                    ?.toString()
                    ?.slice(0, -6)
                )}
                M
              </Typography>
            </Box>
          </Box>
        </MarketData>
      </Sidebar>
      <CoinInfo coin={coin} />
    </Container>
  );
};

export default CoinPage;