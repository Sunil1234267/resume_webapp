import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Message } from "./ChatWidget";
import ChatBubble from "./ChatBubble";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-grow p-4 overflow-y-auto space-y-4">
      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg} />
      ))}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start items-center gap-2"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground flex-shrink-0">
            <span className="text-lg">🤖</span>
          </div>
          <div className="flex items-center gap-1 p-3 rounded-lg bg-muted">
            <motion.span
              className="w-2 h-2 bg-muted-foreground rounded-full"
              animate={{
                y: [0, -4, 0],
                transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.span
              className="w-2 h-2 bg-muted-foreground rounded-full"
              animate={{
                y: [0, -4, 0],
                transition: {
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                },
              }}
            />
            <motion.span
              className="w-2 h-2 bg-muted-foreground rounded-full"
              animate={{
                y: [0, -4, 0],
                transition: {
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                },
              }}
            />
          </div>
        </motion.div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
