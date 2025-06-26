import { Box, Typography, Stack } from '@mui/material';
import { format, isEqual, startOfDay, add } from 'date-fns';
import ChatCard from '../ChatCard/ChatCard';

export default function ChatHistoryCard({ details }) {
  // This function formats the date for grouping chats
  const getChatDateLabel = (chatDate) => {
    const today = startOfDay(new Date());
    const messageDay = startOfDay(new Date(chatDate));

    if (isEqual(messageDay, today)) {
      return "Chats from Today";
    } else if (isEqual(messageDay, add(today, { days: -1 }))) {
      return "Chats from Yesterday";
    } else {
      return format(messageDay, 'do MMM yyyy');
    }
  };

  return (
    <Box>
      {/* Display date title for the chat section */}
      <Typography fontWeight={700} marginBottom={2}>
        {getChatDateLabel(details.datetime)}
      </Typography>

      {/* Display all messages for the selected day */}
      <Stack spacing={{ xs: 2, md: 3 }}>
        {details.chat.map((message, index) => (
          <ChatCard
            key={index}
            details={message}
            readOnly={true} // Makes cards non-editable
          />
        ))}
      </Stack>
    </Box>
  );
}
