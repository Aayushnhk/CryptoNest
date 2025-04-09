import { Container, Typography, Box, Button } from "@mui/material";
import Carousel from "./Carousel";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Banner({ scrollToTable }) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleScroll = () => {
    scrollToTable?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#14161a",
        backgroundImage:
          "radial-gradient(circle at top left, rgba(255, 255, 255, 0.05), transparent 60%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: { xs: 6, md: 10 },
        px: 2,
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            mb: { xs: 4, md: 6 },
          }}
          data-aos="fade-up"
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontFamily: "Montserrat",
              color: "#fff",
              fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" },
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            Crypto Nest
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              fontSize: { xs: "0.9rem", md: "1rem" },
              maxWidth: "600px",
              mb: 3,
            }}
          >
            Get all the info regarding your favorite crypto currency
          </Typography>
          <Button
            variant="outlined"
            onClick={handleScroll}
            sx={{
              borderColor: "#ffcc00",
              color: "#ffcc00",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              px: 3,
              py: 1,
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#ffcc00",
                color: "#14161a",
              },
            }}
          >
            Explore Coins
          </Button>
        </Box>

        <Box sx={{ width: "100%" }} data-aos="fade-up">
          <Carousel />
        </Box>
      </Container>
    </Box>
  );
}

export default Banner;
