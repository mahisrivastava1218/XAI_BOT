import { useContext } from "react";
import { ThemeContext } from "../../components/Theme/Theme";
import {
  Typography,
  Box,
  Stack,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

import AddCommentIcon from "@mui/icons-material/AddComment";
import CloseIcon from "@mui/icons-material/Close";

import icon from "../../assets/Group 1000011095.png";

export default function Slider({ setChat, closeMenu }) {
  const { mode, setMode } = useContext(ThemeContext);

  // Check if the screen is small (like on mobile)
  const isSmallScreen = useMediaQuery("(max-width:800px)");

  // Change theme between light and dark
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <Box>
      {/* Show close button on mobile devices */}
      {isSmallScreen && (
        <Button
          onClick={closeMenu}
          endIcon={<CloseIcon />}
          sx={{
            width: "100%",
            justifyContent: "flex-end",
            color: mode === "light" ? "primary.dark" : "text.primary",
            padding:"5px"
          }}
        >
          Close
        </Button>
      )}

      {/* Start New Chat */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          py={2}
          px={{ xs: 2, md: 3 }}
          onClick={() => {
            setChat([]);
            closeMenu();
          }}
          sx={{
            bgcolor: "primary.main",
            "&:hover": {
              bgcolor: "primary.bg",
            },
          }}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <Box
              component="img"
              src={icon}
              alt="New Chat"
              height={42}
              width={42}
              borderRadius={2}
              boxShadow={4}
              flexShrink={0}
            />
            <Typography
              fontSize={{ xs: 16, md: 20 }}
              color="text.primary"
              variant="heading"
            >
               New Chat
            </Typography>
          </Stack>

          <AddCommentIcon sx={{ color: "text.primary" }} />
        </Stack>
      </Link>

      {/* View Chat History */}
      <Box p={{ xs: 2, md: 3 }}>
        <Link to="/history" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            fullWidth
            onClick={closeMenu}
          >
            Past Conversations
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
