import { Outlet } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import Slider from "./components/Slider/Slider";
import { ThemeContext } from "./components/Theme/Theme";
import { getThemePallete } from "./components/Theme/ThemePallete";

function App() {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") || "light"
  );
  const [chatData, setChatData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Create custom theme based on current mode
  const appliedTheme = useMemo(() => createTheme(getThemePallete(themeMode)), [themeMode]);

  // Save current theme mode to localStorage
  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ mode: themeMode, setMode: setThemeMode }}>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />

        <Grid
          container
          sx={{
            background:
              "linear-gradient(rgba(215, 199, 244, 0.2), rgba(151, 133, 186, 0.2))",
          }}
        >
          {/* Sidebar - visible on left for desktop, sliding panel on mobile */}
          <Grid
            item
            xs={12}
            md={2.5}
            sx={{
              bgcolor: "primary.light",
              "@media (max-width:800px)": {
                width: "70%",
                transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 400ms ease",
              },
            }}
            position={{ xs: "fixed", md: "relative" }}
            height={"100vh"}
            zIndex={{ xs: 9999, md: 1 }}
            boxShadow={{ xs: isSidebarOpen ? 10 : 0, md: 0 }}
          >
            <Slider
              setChat={setChatData}
              closeMenu={() => setIsSidebarOpen(false)}
            />
          </Grid>

          {/* Main content area where page routes render */}
          <Grid item xs={12} md={9.5}>
            <Outlet
              context={{
                chat: chatData,
                setChat: setChatData,
                handleMobileMenu: setIsSidebarOpen,
              }}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
