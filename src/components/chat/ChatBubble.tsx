import { motion } from "framer-motion";
import { Bot, User, AlertTriangle } from "lucide-react";
import { Message } from "./ChatWidget";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.sender === "user";
  const isError = message.sender === "error";

  const bubbleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const Icon = isUser ? User : isError ? AlertTriangle : Bot;

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex items-start gap-3 w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0",
            isError ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground"
          )}
        >
          <Icon size={20} />
        </div>
      )}
      <div
        className={cn(
          "max-w-[75%] p-3 rounded-2xl",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-lg"
            : isError
            ? "bg-destructive/20 text-destructive-foreground rounded-bl-lg"
            : "bg-muted text-muted-foreground rounded-bl-lg"
        )}
      >
        <p className="text-sm break-words">{message.text}</p>
      </div>
      {isUser && (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground flex-shrink-0">
          <Icon size={20} />
        </div>
      )}
    </motion.div>
  );
};

export default ChatBubble;
