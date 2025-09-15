import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChatBubbleIcon, Cross2Icon } from '@radix-ui/react-icons';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  // IMPORTANT: Replace this with your actual webhook URL
  const webhookUrl = 'https://n8n.sunilkhatri.info/webhook/chatbot';

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute bottom-20 right-0 w-[calc(100vw-4rem)] max-w-sm h-[60vh] bg-card border border-border rounded-lg shadow-xl flex flex-col"
              style={{ originX: 1, originY: 1 }}
            >
              <header className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">Support Chat</h3>
              </header>
              <div className="flex-grow p-0 overflow-hidden">
                <iframe
                  src={webhookUrl}
                  title="Chatbot"
                  className="w-full h-full border-0"
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <motion.div
          initial={{ scale: 0, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              onClick={toggleChat}
              className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
              aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0, y: 10 }}
                  animate={{ rotate: 0, opacity: 1, y: 0 }}
                  exit={{ rotate: 90, opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <Cross2Icon className="h-8 w-8" />
                  ) : (
                    <ChatBubbleIcon className="h-8 w-8" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Chatbot;
