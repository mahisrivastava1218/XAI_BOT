import { useContext } from "react";
import {
  Typography,
  Stack,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Link, useOutletContext } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { ThemeContext } from "../../components/Theme/Theme";

export default function Navbar() {
  // Get shared methods from layout context
  const { handleMobileMenu } = useOutletContext();

  // Detect small screens
  const isSmallScreen = useMediaQuery("(max-width:800px)");

  // Access theme mode and updater from context
  const { mode, setMode } = useContext(ThemeContext);

  // Toggle between dark and light theme
  const switchTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <Stack
      component="header"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      p={{ xs: 2, md: 3 }}
    >
      {/* Left section: menu button + brand */}
      <Stack direction="row" alignItems="center" spacing={2}>
        {isSmallScreen && (
          <IconButton onClick={() => handleMobileMenu((prev) => !prev)}>
            <MenuIcon />
          </IconButton>
        )}

        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h1" component="h1">
            Bot AI
          </Typography>
        </Link>
      </Stack>

      {/* Right section: theme mode label + icon */}
      <Stack direction="row" alignItems="center" spacing={0.2}>
        <Typography fontSize={10} textTransform="capitalize">
          {mode}
        </Typography>
        <IconButton onClick={switchTheme}>
          {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Stack>
    </Stack>
  );
}
