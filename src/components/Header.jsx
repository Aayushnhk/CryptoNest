import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
    Box,
  } from "@mui/material";
  import { createTheme, ThemeProvider } from "@mui/material/styles";
  import { makeStyles } from "@mui/styles";
  import { useNavigate } from "react-router-dom";
  import { CryptoState } from "../CryptoContext";
  
  const useStyles = makeStyles((theme) => ({
    title: {
      background: "linear-gradient(to right, #ffcc00, #ff9900)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 800,
      letterSpacing: "0.5px",
      cursor: "pointer",
      textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
        textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
      },
    },
    appBar: {
      background: "linear-gradient(145deg, #1e1e1e, #2b2b2b)",
      boxShadow: "0px 3px 15px rgba(0,0,0,0.4) !important",
      borderBottom: "1px solid rgba(255, 204, 0, 0.1)",
    },
    select: {
      "& .MuiSelect-select": {
        padding: "8px 16px",
        borderRadius: "8px",
      },
    },
  }));
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#2b2b2b",
      },
      mode: "dark",
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });
  
  function Header() {
    const classes = useStyles();
    const { currency, setCurrency } = CryptoState();
    const history = useNavigate();
  
    return (
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" className={classes.appBar}>
          <Container maxWidth="xl" sx={{ py: 1 }}>
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: { xs: "0 8px", sm: "0 16px" },
              }}
              disableGutters
            >
              <Box
                onClick={() => history("/")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant="h5"
                  className={classes.title}
                  sx={{
                    fontSize: { xs: "1.4rem", sm: "1.8rem", md: "2rem" },
                    lineHeight: 1.2,
                  }}
                  tabIndex={-1}
                  contentEditable={false}
                >
                  Crypto Nest
                </Typography>
              </Box>
  
              <Select
                variant="outlined"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={classes.select}
                sx={{
                  width: 110,
                  height: 40,
                  fontWeight: 600,
                  backgroundColor: "rgba(30, 30, 30, 0.8)",
                  backdropFilter: "blur(4px)",
                  color: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 0 0 1px rgba(255, 204, 0, 0.3)",
                  transition: "all 0.3s ease",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&:hover": {
                    boxShadow: "0 0 0 2px #ffcc00",
                    backgroundColor: "rgba(30, 30, 30, 1)",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#ffcc00",
                  },
                  "&.Mui-focused": {
                    boxShadow: "0 0 0 2px #ff9900",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "#1e1e1e",
                      color: "#fff",
                      "& .MuiMenuItem-root": {
                        "&:hover": {
                          backgroundColor: "rgba(255, 204, 0, 0.1)",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "rgba(255, 204, 0, 0.2)",
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    );
  }
  
  export default Header;
  