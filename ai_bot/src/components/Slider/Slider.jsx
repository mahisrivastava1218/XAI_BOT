import { useContext } from "react";
import { ThemeContext } from "../Theme/Theme";
import {
  Typography,
  Box,
  Stack,
  Button,
  useMediaQuery,
} from "@mui/material";
import icon from "../../assets/Group 1000011095.png";
import { Link } from "react-router-dom";
import AddCommentIcon from "@mui/icons-material/AddComment";
import CloseIcon from "@mui/icons-material/Close";

export default function Sidebar({ setChat, closeMenu }) {
  const { mode, setMode } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width:800px)");

  return (
    <Box>
      {/* Close button for mobile sidebar */}
      {isMobile && (
        <Button
          endIcon={<CloseIcon />}
          onClick={closeMenu}
          sx={{
            width: "100%",
            justifyContent: "flex-end",
            color: mode === "light" ? "primary.dark" : "text.primary",
          }}
        >
          Close
        </Button>
      )}

      {/* New Chat Button */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <Stack
          onClick={() => {
            setChat([]);
            closeMenu();
          }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          py={2}
          px={{ xs: 2, md: 3 }}
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
              alt="new chat"
              height={42}
              width={42}
              borderRadius={2}
              boxShadow={4}
              flexShrink={0}
            />
            <Typography
              fontSize={{ xs: 16, md: 20 }}
              color="text.primary"
            >
             New Chat
            </Typography>
          </Stack>
          <AddCommentIcon sx={{ color: "text.primary" }} />
        </Stack>
      </Link>

      {/* Past Chats Button */}
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
