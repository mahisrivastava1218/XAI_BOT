import {
  Box,
  Stack,
  Typography,
  Modal,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export default function FeedbackModal({ open, handleClose, chatId, updateChat }) {
  const [feedbackText, setFeedbackText] = useState('');

  // Styling for the popup box
  const modalBoxStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    maxWidth: 720,
    bgcolor: 'primary.bgtheme',
    p: { xs: 2, md: 3 },
    boxShadow: 24,
    borderRadius: '10px',
  };

  // Called when user submits feedback
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    // Update the selected chat with new feedback
    updateChat((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === chatId ? { ...msg, feedback: feedbackText } : msg
      )
    );

    setFeedbackText('');
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalBoxStyles}>
        {/* Header Section */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
            <FeedbackIcon />
            <Typography variant="heading" fontSize={{ xs: 14, md: 18 }}>
              Provide Additional Feedback
            </Typography>
          </Stack>

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Feedback Input Form */}
        <Box
          component="form"
          pt={3}
          onSubmit={handleFeedbackSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 2,
          }}
        >
          <TextField
            placeholder="Type your feedback here..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            multiline
            rows={6}
            fullWidth
            required
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
