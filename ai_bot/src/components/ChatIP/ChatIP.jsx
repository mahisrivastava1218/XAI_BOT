import {
  Box,
  Button,
  Stack,
  Snackbar,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
export default function ChatInput({ generateResponse, setScroll, chat, clearChat }) {
  const [message, setMessage] = useState('');
  const [showSavedPopup, setShowSavedPopup] = useState(false);
  const inputRef = useRef(null);

  // Send message
  const handleSend = (e) => {
    e.preventDefault();
    generateResponse(message);
    setMessage('');
    setScroll((prev) => !prev); // trigger scroll to bottom
  };

  // Save chat to localStorage
  const handleSaveChat = () => {
    const stored = JSON.parse(localStorage.getItem('chat')) || [];
    const newEntry = { chat: chat, datetime: new Date() };
    localStorage.setItem('chat', JSON.stringify([newEntry, ...stored]));

    clearChat(); // clear messages after saving
    setShowSavedPopup(true); // show snackbar
  };

  // Focus input box on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Box flexShrink={0} px={{ xs: 0.5, md: 3 }} pb={{ xs: 1, md: 3 }}>
      <Box component="form" onSubmit={handleSend}>
        <Stack direction="row" spacing={{ xs: 0.5, md: 2 }}>
          {/* Message Input */}
          <input
            placeholder="Message Bot AI..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            inputRef={inputRef}
            sx={{
              flex: 1,
              bgcolor: 'primary.light',
              borderRadius: 1,
              '& input': {
                fontSize: { xs: 12, md: 16 },
                px: { xs: 1, md: 2 },
              },
            }}
          />

          {/* Ask Button */}
          <Button
            variant="contained"
            type="submit"
            sx={{
              fontSize: { xs: 12, md: 16 },
              '@media (max-width:767px)': {
                minWidth: 0,
                px: 1.5,
              },
            }}
          >
            Ask
          </Button>

          {/* Save Button */}
          <Button
            variant="outlined"
            onClick={handleSaveChat}
            disabled={chat.length === 0}
            sx={{
              fontSize: { xs: 12, md: 16 },
              '@media (max-width:767px)': {
                minWidth: 0,
                px: 1.5,
              },
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>

      {/* Saved Snackbar */}
      <Snackbar
        open={showSavedPopup}
        message="Chat saved."
        onClose={() => setShowSavedPopup(false)}
        autoHideDuration={5000}
        action={
          <Link to="/history">
            <Button size="small">View History</Button>
          </Link>
        }
      />
    </Box>
  );
}
