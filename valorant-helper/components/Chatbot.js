import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

const Message = ({ text, actor }) => {
  return (
    <Flex
      p={4}
      bg={actor === 'user' ? 'pink.500' : 'gray.100'}
      color={actor === 'user' ? 'white' : 'gray.600'}
      borderRadius="lg"
      w="fit-content"
      alignSelf={actor === 'user' ? 'flex-end' : 'flex-start'}
    >
      <Text>{text}</Text>
    </Flex>
  );
};

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi', actor: 'user' },
    { text: 'How may I help you?', actor: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() === '') return; // Don't send empty messages

    const newUserMessage = { text: inputValue, actor: 'user' };
    const newBotMessage = { text: 'Loading...', actor: 'bot' }; // Placeholder for bot response

    setMessages((prevMessages) => [...prevMessages, newUserMessage, newBotMessage]);
    setInputValue(''); // Clear input after sending

    // Simulate response delay (replace with actual API call for ChatGPT)
    setTimeout(() => {
      const botResponse = { text: 'Bot response here', actor: 'bot' }; // Replace with actual response from ChatGPT
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[prevMessages.length - 1] = botResponse; // Replace placeholder with actual bot response
        return updatedMessages;
      });
    }, 1000); // Simulated response delay in milliseconds
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Flex
      flexDirection="column"
      w="2xl"
      m="auto"
      h="full"
      borderWidth="1px"
      roundedTop="lg"
      overflow="hidden"
    >
      <HStack p={4} bg="pink.500">
        <Heading size="lg" color="white">
          ValHelper
        </Heading>
      </HStack>

      <Stack
        px={4}
        py={20}
        overflowY="auto"
        maxH="calc(100vh - 400px)" // Adjust max height as needed
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#d5e3f7',
            borderRadius: '24px',
          },
        }}
      >
        {messages.map((message, index) => (
          <Message key={index} text={message.text} actor={message.actor} />
        ))}
        <div ref={messagesEndRef} />
      </Stack>

      <HStack p={4} bg="gray.100">
        <Input
          bg="white"
          placeholder="Enter your text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button colorScheme="pink" onClick={handleSend}>
          Send
        </Button>
      </HStack>
    </Flex>
  );
};

export default ChatApp;