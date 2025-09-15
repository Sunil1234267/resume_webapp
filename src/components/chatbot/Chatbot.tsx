import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
import { Tables } from '@/types/supabase';
import { cn } from '@/lib/utils'; // Import the cn utility function

type Message = Tables<'messages'>;

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data || []);
    }
    setIsLoading(false);
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Tables<'messages'> = {
      id: crypto.randomUUID(), // Client-side UUID for immediate display
      user_id: (await supabase.auth.getUser()).data.user?.id || null,
      content: input,
      is_user_message: true,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Save user message to Supabase
    const { error: insertError } = await supabase.from('messages').insert(userMessage);
    if (insertError) {
      console.error('Error saving user message:', insertError);
      // Optionally, revert message or show error to user
    }

    // Send message to n8n webhook
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content, userId: userMessage.user_id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponseContent = data.response || "Sorry, I didn't understand that.";

      const botMessage: Tables<'messages'> = {
        id: crypto.randomUUID(),
        user_id: userMessage.user_id, // Associate with the same user
        content: botResponseContent,
        is_user_message: false,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Save bot message to Supabase
      const { error: botInsertError } = await supabase.from('messages').insert(botMessage);
      if (botInsertError) {
        console.error('Error saving bot message:', botInsertError);
      }

    } catch (error) {
      console.error('Error sending message to n8n or receiving response:', error);
      const errorMessage: Tables<'messages'> = {
        id: crypto.randomUUID(),
        user_id: userMessage.user_id,
        content: "Oops! Something went wrong. Please try again.",
        is_user_message: false,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full shadow-lg z-50"
          aria-label="Open Chatbot"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Chat with me!</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 border rounded-md bg-muted/20">
          {isLoading && messages.length === 0 ? (
            <div className="text-center text-muted-foreground">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-muted-foreground">No messages yet. Start a conversation!</div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.is_user_message ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={cn(
                    'max-w-[70%] p-3 rounded-lg',
                    msg.is_user_message
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  )}
                >
                  {msg.content}
                  <div className="text-xs text-right opacity-70 mt-1">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !isLoading) {
                sendMessage();
              }
            }}
            disabled={isLoading}
          />
          <Button onClick={sendMessage} disabled={isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Chatbot;
