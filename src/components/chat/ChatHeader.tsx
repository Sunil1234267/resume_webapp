import { Bot, X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Bot className="w-8 h-8 text-primary" />
          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-card" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">Resume Assistant</h3>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Close chat"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default ChatHeader;
