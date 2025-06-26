import { Outlet } from "react-router-dom";
import  {CssBaseline}  from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import { Grid } from "@mui/material";
import { useMemo,useState } from "react";
import Slider from "./components/Slider/Slider";
function App() {
   const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline/>
   <Grid
  item
  xs={12}
  md={2.5}
  sx={{
       bgcolor: "primary.light",
       "@media (max-width:800px)": {
       width: "70%",
       transform: ismenuOpen ? "translateX(0)" : "translateX(-100%)",
       transition: "transform 0.4s ease-in-out",
     },
  }}
  position={{ xs: "fixed", md: "relative" }}
  height="100vh"
  zIndex={{ xs: 9999, md: 1 }}
  boxShadow={{ xs: ismenuOpen ? 10 : 0, md: 0 }}>
  <Slider setChat={setChat} closeMenu={() => setMenuOpen(false)} />
</Grid>

      <Outlet context={{toggleTheme,mode}}/>
    </ThemeProvider>
  );
}

export default App;
