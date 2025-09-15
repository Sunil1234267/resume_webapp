import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Bot, User, Send } from "lucide-react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot" | "error";
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can I help you with your resume today?",
      sender: "bot",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: userInput,
      sender: "user",
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    if (!webhookUrl || webhookUrl === 'YOUR_N8N_WEBHOOK_URL_HERE') {
        const errorMessage: Message = {
            id: Date.now() + 1,
            text: "Chatbot is not configured. Please set the VITE_N8N_WEBHOOK_URL in the .env file.",
            sender: "error",
        };
        setMessages((prev) => [...prev, errorMessage]);
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      const botReply: Message = {
        id: Date.now() + 1,
        text: data.reply || "Sorry, I didn't understand that.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Webhook call failed:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, something went wrong. Please try again later.",
        sender: "error",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-24 right-4 w-full max-w-sm h-[600px] bg-surface border border-border rounded-2xl shadow-2xl flex flex-col z-50"
            style={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))'
            }}
          >
            <ChatHeader onClose={() => setIsOpen(false)} />
            <ChatMessages messages={messages} isLoading={isLoading} />
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-full shadow-lg z-50"
        aria-label="Toggle chat widget"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </>
  );
};

export default ChatWidget;
