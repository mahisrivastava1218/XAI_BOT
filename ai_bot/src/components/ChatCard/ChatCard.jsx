import {
  Box,
  Stack,
  Typography,
  IconButton,
  Rating,
} from '@mui/material';

import botImage from '../../assets/Group 1000011095.png';
import userImage from '../../assets/Group 1000011096.png';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function ChatCard({
  details,
  showFeedbackModal,
  updateChat,
  setSelectedChatId,
  readOnly = false,
}) {
  const [showStars, setShowStars] = useState(false);
  const [stars, setStars] = useState(0);

  // When user gives a rating, save it in the chat list
  useEffect(() => {
    if (showStars) {
      updateChat((prevChat) =>
        prevChat.map((msg) =>
          msg.id === details.id ? { ...msg, rating: stars || 0 } : msg
        )
      );
    }
  }, [stars]);

  return (
    <Stack
      p={{ xs: 1, md: 2 }}
      spacing={2}
      direction="row"
      borderRadius={1}
      boxShadow="0 0 4px rgba(0,0,0,0.1)"
      bgcolor={readOnly ? 'primary.main' : 'primary.light'}
      sx={{
        '&:hover .feedback-buttons': {
          visibility: 'visible',
          opacity: 1,
        },
      }}
    >
      {/* Avatar */}
      <Box
        component="img"
        src={details.type === 'AI' ? botImage : userImage}
        height={{ xs: 30, md: 68 }}
        width={{ xs: 30, md: 68 }}
        borderRadius="50%"
        sx={{ objectFit: 'cover' }}
      />

      {/* Chat Text and Feedback */}
      <Box>
        <Typography fontWeight={700} fontSize={{ xs: 14, md: 16 }}>
          {details.type === 'AI' ? 'Soul AI' : 'You'}
        </Typography>

        <Typography fontSize={{ xs: 12, md: 16 }}>{details.text}</Typography>

        {/* Time and Thumbs */}
        <Stack direction="row" gap={2} alignItems="center" mt={1}>
          <Typography fontSize={{ xs: 8, md: 12 }} color="text.secondary">
            {format(details.time, 'hh:mm a')}
          </Typography>

          {details.type === 'AI' && !readOnly && (
            <Stack
              direction="row"
              spacing={1}
              className="feedback-buttons"
              visibility={{ xs: 'visible', md: 'hidden' }}
              sx={{
                opacity: { xs: 1, md: 0 },
                transition: 'opacity 400ms ease',
              }}
            >
              {/* Like */}
              <IconButton size="small" onClick={() => setShowStars((prev) => !prev)}>
                {showStars ? (
                  <ThumbUpAltIcon fontSize="inherit" />
                ) : (
                  <ThumbUpOffAltIcon fontSize="inherit" />
                )}
              </IconButton>

              {/* Dislike */}
              <IconButton
                size="small"
                onClick={() => {
                  setSelectedChatId(details.id);
                  showFeedbackModal();
                }}
              >
                <ThumbDownOffAltIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          )}
        </Stack>

        {/* Rating stars */}
        {details.type === 'AI' && (showStars || details.rating > 0) && (
          <Box pt={1}>
            <Typography fontSize={{ xs: 10, md: 12 }} mb={0.5}>
              {readOnly ? 'Rating:' : 'Give stars:'}
            </Typography>
            <Rating
              value={details.rating > 0 ? details.rating : stars}
              onChange={(e, newValue) => setStars(newValue)}
              readOnly={readOnly}
            />
          </Box>
        )}

        {/* Feedback text if any */}
        {details.feedback && (
          <Typography pt={1} fontSize={{ xs: 10, md: 16 }}>
            <Box component="span" fontWeight={600}>
              Feedback:
            </Box>{' '}
            <Box component="span">{details.feedback}</Box>
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
