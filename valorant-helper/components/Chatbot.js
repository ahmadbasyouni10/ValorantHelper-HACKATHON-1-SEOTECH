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
import e from 'cors';

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

  const handleSend = async () => {
    if (inputValue.trim() === '') return; // Don't send empty messages

    const newUserMessage = { text: inputValue, actor: 'user' };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputValue(''); // Clear input after sending

    // Call Flask endpoint for chatbot response
    const response = await fetch('http://localhost:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
        });

    if (response.ok) {
        const data = await response.json();
        const botResponse = { text: data.response, actor: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
    }
    else {
        console.error('Failed to fetch chatbot response:', response.status);
    }                                                                                                        
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