import { Box, Select, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ChatFilter({ allChats, filterChats }) {
  const [selectedRating, setSelectedRating] = useState('All Ratings');

  // When dropdown changes
  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  // Filter chat history based on rating
  useEffect(() => {
    if (selectedRating === 'All Ratings') {
      filterChats(allChats);
    } else {
      const updatedList = allChats.filter((entry) => {
        let hasRatedMessage = false;

        entry.chat.forEach((msg) => {
          if (msg.rating === selectedRating) {
            hasRatedMessage = true;
          }
        });

        return hasRatedMessage;
      });

      filterChats(updatedList);
    }
  }, [selectedRating]);

  return (
    <Box marginBottom={3}>
      <Typography fontSize={12} marginBottom={0.5}>
        Filter by rating
      </Typography>
      <Select
        value={selectedRating}
        onChange={handleRatingChange}
        size="small"
        sx={{
          minWidth: { xs: 1, md: 160 },
        }}
      >
        <MenuItem value="All Ratings">All Ratings</MenuItem>
        <MenuItem value={1}>1 Star</MenuItem>
        <MenuItem value={2}>2 Stars</MenuItem>
        <MenuItem value={3}>3 Stars</MenuItem>
        <MenuItem value={4}>4 Stars</MenuItem>
        <MenuItem value={5}>5 Stars</MenuItem>
      </Select>
    </Box>
  );
}
