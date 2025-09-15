import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSendMessage: (input: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-border flex-shrink-0"
    >
      <div className="flex items-center gap-2 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="w-full bg-background text-foreground rounded-full py-2 pl-4 pr-12 border border-border focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
          disabled={isLoading}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 disabled:bg-muted disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <Send size={18} />
        </motion.button>
      </div>
    </form>
  );
};

export default ChatInput;
