import { useEffect, useRef, useState, useContext } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useOutletContext } from "react-router-dom";

import Navbar from '../../components/Navbar/Navbar';
import ChatInput from '../../components/ChatIP/ChatIP';
import InitiaNoChat from '../../components/InitialNoChat/InitialNoChat';
import ChatCard from '../../components/ChatCard/ChatCard';
import Feedback from '../../components/Feedback/Feedback';

import { ThemeContext } from '../../components/Theme/Theme';
import sampleData from '../../Data/SampleData.json';

export default function Home() {
  // App states
  const [chatId, setChatId] = useState(1);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(false);

  // Shared context from parent route
  const { chat, setChat } = useOutletContext();
  const { mode } = useContext(ThemeContext);

  const chatContainerRef = useRef(null);

  // Auto-scroll to the newest message
  useEffect(() => {
    chatContainerRef.current?.lastElementChild?.scrollIntoView();
  }, [scrollToBottom]);

  // Handles user input and generates AI reply
  const handleSendMessage = (userMessage) => {
    const found = sampleData.find(
      (entry) => entry.question.toLowerCase() === userMessage.toLowerCase()
    );

    const aiReply = found ? found.response : "Sorry, Did not understand your query!";

    // Update chat with both human and AI messages
    setChat((prev) => [
      ...prev,
      { type: 'Human', text: userMessage, time: new Date(), id: chatId },
      { type: 'AI', text: aiReply, time: new Date(), id: chatId + 1 }
    ]);

    setChatId((prev) => prev + 2);
  };

  return (
    <Stack
      height="100vh"
      justifyContent="space-between"
      sx={{
        '@media (max-width:767px)': {
          background: mode === 'light' ? 'linear-gradient(#F9FAFA 60%, #EDE4FF)' : '',
        },
      }}
    >
      {/* Top Navigation */}
      <Navbar />

      {/* Show welcome component if chat is empty */}
      {chat.length === 0 && (
        <InitiaNoChat generateResponse={handleSendMessage} />
      )}

      {/* Chat area if messages exist */}
      {chat.length > 0 && (
        <Stack
          flexGrow={1}
          p={{ xs: 2, md: 3 }}
          spacing={{ xs: 2, md: 3 }}
          sx={{
            overflowY: 'auto',
            '&::-webkit-scrollbar': { width: '10px' },
            '&::-webkit-scrollbar-track': {
              boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
              borderRadius: '8px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(151, 133, 186, 0.4)',
              borderRadius: '8px'
            }
          }}
          ref={chatContainerRef}
        >
          {chat.map((item, index) => (
            <ChatCard
              key={index}
              details={item}
              updateChat={setChat}
              setSelectedChatId={setSelectedChatId}
              showFeedbackModal={() => setShowFeedback(true)}
            />
          ))}
        </Stack>
      )}

      {/* Input field at bottom */}
      <ChatInput
        generateResponse={handleSendMessage}
        setScroll={setScrollToBottom}
        chat={chat}
        clearChat={() => setChat([])}
      />

      {/* Feedback popup */}
      <Feedback
        open={showFeedback}
        updateChat={setChat}
        chatId={selectedChatId}
        handleClose={() => setShowFeedback(false)}
      />
    </Stack>
  );
}
