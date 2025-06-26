import {
  Box,
  Typography,
  Stack,
  Divider,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import FilterChat from '../../components/Filter/FilterChat';
import HistoryCard from '../../components/HistoryCard/HistoryCard';

export default function History() {
  const [allChats, setAllChats] = useState([]);
  const [visibleChats, setVisibleChats] = useState([]);

  // Load chat history from localStorage on component load
  useEffect(() => {
    const stored = localStorage.getItem('chat');
    if (stored) {
      const parsed = JSON.parse(stored);
      setAllChats(parsed);
      setVisibleChats(parsed);
    }
  }, []);

  return (
    <Box
      height="100vh"
      sx={{
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(151, 133, 186, 0.4)',
          borderRadius: '6px',
        },
      }}
    >
      {/* Top Navigation Bar */}
      <Navbar />

      <Box padding={{ xs: 2, md: 3 }}>
        <Typography
          variant="h2"
          align="center"
          marginBottom={3}
        >
          Chat History
        </Typography>

        {/* Show filter if chats exist */}
        {allChats.length > 0 && (
          <FilterChat allChats={allChats} filterChats={setVisibleChats} />
        )}

        {/* Message when no chats are saved */}
        {allChats.length === 0 && (
          <Typography
            textAlign="center"
            padding={3}
            bgcolor="primary.light"
            borderRadius={2}
          >
            You haven’t saved any chat conversations yet.
          </Typography>
        )}

        {/* Message when filter yields no results */}
        {allChats.length > 0 && visibleChats.length === 0 && (
          <Typography
            textAlign="center"
            padding={3}
            bgcolor="primary.light"
            borderRadius={2}
          >
            No such chats.
          </Typography>
        )}

        {/* Render chat history cards */}
        {visibleChats.length > 0 && (
          <Stack
            spacing={4}
            divider={
              <Divider
                sx={{ borderColor: 'primary.bg', opacity: 0.4 }}
              />
            }
          >
            {visibleChats.map((chatItem, idx) => (
              <HistoryCard key={idx} details={chatItem} />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
