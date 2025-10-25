import { useState, FormEvent, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, Bot, User, Lock, Download, FileText, Image, File } from "lucide-react";

interface FileAttachment {
  name: string;
  url: string;
  type: string;
  size?: number;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  files?: FileAttachment[];
}

// Generate a unique session ID
const generateSessionId = (): string => {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Helper function to get file icon based on file type
const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return Image;
  if (type.includes('pdf') || type.includes('document') || type.includes('text')) return FileText;
  return File;
};

// Helper function to format file size
const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

// Helper function to handle file download
const downloadFile = async (file: FileAttachment) => {
  try {
    const response = await fetch(file.url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Download failed:', error);
  }
};

const Chatbot = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);
  const sessionIdRef = useRef<string>(generateSessionId());

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_APP_PASSWORD || "password123";
    
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setMessages([{
        id: messageIdRef.current++,
        text: "Hello! I'm your AI assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      }]);
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
    setPassword("");
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messageIdRef.current++,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Use the dedicated chatbot webhook URL
      const webhookUrl = import.meta.env.VITE_N8N_CHATBOT_WEBHOOK_URL || import.meta.env.VITE_N8N_WEBHOOK_URL;
      
      const requestBody = {
        chatInput: inputMessage,
        session_id: sessionIdRef.current,
        sessionId: sessionIdRef.current,  // Alternative format
        sessionID: sessionIdRef.current,  // Alternative format
        memory_session_id: sessionIdRef.current,  // For memory nodes
        timestamp: new Date().toISOString(),
        source: 'chatbot'
      };
      
      // Add session ID as query parameter for additional compatibility
      const urlWithParams = new URL(webhookUrl);
      urlWithParams.searchParams.append('session_id', sessionIdRef.current);
      urlWithParams.searchParams.append('sessionId', sessionIdRef.current);
      
      console.log('Sending request to:', urlWithParams.toString());
      console.log('Request body:', requestBody);
      console.log('Webhook URL from env:', import.meta.env.VITE_N8N_CHATBOT_WEBHOOK_URL);
      console.log('Fallback URL from env:', import.meta.env.VITE_N8N_WEBHOOK_URL);
      
      // Create AbortController for timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5 * 60 * 1000); // 5 minutes timeout
      
      const response = await fetch(urlWithParams.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Basic Authentication for N8N webhook
          'Authorization': `Basic ${btoa('sunilkhatri:Utility@5432')}`,
          // Session ID in headers as well
          'X-Session-ID': sessionIdRef.current,
          'Session-ID': sessionIdRef.current,
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal, // Add timeout signal
      });
      
      clearTimeout(timeoutId); // Clear timeout if request completes

      let botResponse = "I'm sorry, I couldn't process your request at the moment.";
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        console.log('Response is OK, status:', response.status);
        try {
          const data = await response.json();
          console.log('Full Response data:', JSON.stringify(data, null, 2));
          console.log('Response data type:', typeof data);
          console.log('Response data keys:', Object.keys(data || {}));
          
          // More comprehensive response parsing
          let extractedResponse = null;
          
          // Check direct string response
          if (typeof data === 'string') {
            extractedResponse = data;
            console.log('Found direct string response:', extractedResponse);
          }
          
          // Check common field names
          const possibleFields = [
            'output', 'response', 'message', 'text', 'result', 'answer', 'reply',
            'content', 'data', 'body', 'value', 'chatResponse', 'aiResponse',
            'assistant_response', 'bot_response', 'llm_response'
          ];
          
          for (const field of possibleFields) {
            if (data && data[field] !== undefined && data[field] !== null) {
              extractedResponse = data[field];
              console.log(`Found response in field '${field}':`, extractedResponse);
              break;
            }
          }
          
          // Check nested objects
          if (!extractedResponse && data && typeof data === 'object') {
            // Check if it's an array with first element
            if (Array.isArray(data) && data.length > 0) {
              extractedResponse = data[0];
              console.log('Found response in array[0]:', extractedResponse);
            }
            
            // Check nested data object
            if (!extractedResponse && data.data && typeof data.data === 'object') {
              for (const field of possibleFields) {
                if (data.data[field] !== undefined && data.data[field] !== null) {
                  extractedResponse = data.data[field];
                  console.log(`Found response in nested data.${field}:`, extractedResponse);
                  break;
                }
              }
            }
          }
          
          // Final fallback - stringify the entire object if no specific field found
          if (!extractedResponse && data && typeof data === 'object') {
            // Try to find any string value in the object
            const stringValues = Object.values(data).filter(v => typeof v === 'string' && v.trim().length > 0);
            if (stringValues.length > 0) {
              extractedResponse = stringValues[0];
              console.log('Found string value in object:', extractedResponse);
            }
          }
          
          botResponse = extractedResponse || botResponse;
          console.log('Final extracted bot response:', botResponse);
          
          // Check for file attachments in the response
          let files: FileAttachment[] = [];
          if (data.files && Array.isArray(data.files)) {
            files = data.files.map((file: any) => ({
              name: file.name || file.filename || 'download',
              url: file.url || file.download_url || file.link,
              type: file.type || file.mimetype || 'application/octet-stream',
              size: file.size || file.filesize
            }));
          } else if (data.file) {
            // Single file
            files = [{
              name: data.file.name || data.file.filename || 'download',
              url: data.file.url || data.file.download_url || data.file.link,
              type: data.file.type || data.file.mimetype || 'application/octet-stream',
              size: data.file.size || data.file.filesize
            }];
          } else if (data.download_url || data.file_url) {
            // Direct download URL
            files = [{
              name: data.filename || 'download',
              url: data.download_url || data.file_url,
              type: data.filetype || 'application/octet-stream',
              size: data.filesize
            }];
          }
          
          const botMessage: Message = {
            id: messageIdRef.current++,
            text: botResponse,
            sender: 'bot',
            timestamp: new Date(),
            files: files.length > 0 ? files : undefined
          };

          setMessages(prev => [...prev, botMessage]);
          return; // Early return to avoid duplicate message creation
        } catch (jsonError) {
          console.error('JSON parsing failed:', jsonError);
          console.error('JSON error type:', typeof jsonError);
          console.error('JSON error message:', jsonError instanceof Error ? jsonError.message : String(jsonError));
          
          // Try to get raw response text to see what was actually returned
          try {
            const clonedResponse = response.clone();
            const responseText = await clonedResponse.text();
            console.log('Raw response text after JSON parse failure:', responseText);
            console.log('Response text type:', typeof responseText);
            console.log('Response text length:', responseText.length);
            
            if (responseText && responseText.trim().length > 0) {
              // If we got text, use it as the response
              botResponse = responseText.trim();
              console.log('Using raw text response as bot response:', botResponse);
            } else {
              botResponse = "The server responded successfully but the response was empty. The n8n workflow completed but returned no data.";
            }
          } catch (textError) {
            console.error('Failed to get text from response:', textError);
            botResponse = "The server responded successfully but the response format was unexpected. The n8n workflow may be working but returning data in an unexpected format.";
          }
        }
      } else {
        // Try to get error details from response
        let errorDetails = '';
        try {
          const errorData = await response.json();
          errorDetails = errorData.message || errorData.error || '';
        } catch {
          try {
            errorDetails = await response.text();
          } catch {
            errorDetails = response.statusText;
          }
        }
        
        console.error('Webhook response error:', {
          status: response.status,
          statusText: response.statusText,
          url: webhookUrl,
          errorDetails
        });
        
        if (response.status === 500) {
          botResponse = "Sorry, there's a temporary issue with the AI service. The request was received but couldn't be processed. Please try again in a moment.";
        } else if (response.status === 401 || response.status === 403) {
          botResponse = "Authentication error. Please check the webhook credentials.";
        } else {
          botResponse = `Error: Unable to connect to the AI service (${response.status}). ${errorDetails || 'Please try again later.'}`;
        }
      }

      // Create message for non-JSON responses or error cases
      const botMessage: Message = {
        id: messageIdRef.current++,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      console.error('Error type:', typeof error);
      console.error('Error name:', error instanceof Error ? error.name : 'Unknown');
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack available');
      
      let errorText = "Sorry, I'm having trouble connecting right now. Please check your internet connection and try again.";
      let toastTitle = "Connection Error";
      let toastDescription = "Failed to send message. Please check your connection.";
      
      // Handle timeout specifically
      if (error instanceof Error && error.name === 'AbortError') {
        errorText = "The request is taking longer than expected (over 5 minutes). The AI might still be processing your request. Please try again or check back later.";
        toastTitle = "Request Timeout";
        toastDescription = "The request timed out after 5 minutes. Please try again.";
      } else if (error instanceof TypeError) {
        errorText = "There was an issue processing the response from the server. Please try again.";
        toastTitle = "Response Processing Error";
        toastDescription = "Failed to process server response. Please try again.";
      } else if (error instanceof Error) {
        // More specific error handling based on error message
        if (error.message.includes('Failed to fetch')) {
          errorText = "Network connection failed. Please check your internet connection and try again.";
          toastTitle = "Network Error";
          toastDescription = "Unable to reach the server. Please check your connection.";
        } else if (error.message.includes('JSON')) {
          errorText = "The server response was not in the expected format. The n8n workflow may be working but returning invalid data.";
          toastTitle = "Response Format Error";
          toastDescription = "Server response format issue. Please check the n8n workflow output.";
        }
      }
      
      const errorMessage: Message = {
        id: messageIdRef.current++,
        text: errorText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: toastTitle,
        description: toastDescription,
        variant: "destructive",
        duration: 5000, // Longer duration for timeout errors
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="section-container animate-fade-in">
        <div className="page-header">
          <h2 className="page-header-title">AI Assistant</h2>
          <p className="page-header-description">
            Please enter the password to access the AI assistant.
          </p>
        </div>
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Lock className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle>Password Required</CardTitle>
              <CardDescription>Enter the password to access the chatbot</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Access Chatbot
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="section-container animate-fade-in">
      <div className="page-header">
        <h2 className="page-header-title">AI Assistant</h2>
        <p className="page-header-description">
          Chat with our AI assistant for any questions or support.
        </p>
      </div>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Chat Assistant
          </CardTitle>
          <CardDescription>Ask me anything and I'll do my best to help!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ScrollArea className="h-96 w-full border rounded-md p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`rounded-lg px-3 py-2 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        
                        {/* File attachments */}
                        {message.files && message.files.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.files.map((file, fileIndex) => {
                              const FileIcon = getFileIcon(file.type);
                              return (
                                <div 
                                  key={fileIndex}
                                  className="flex items-center gap-2 p-2 bg-background/20 rounded border"
                                >
                                  <FileIcon className="h-4 w-4" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">{file.name}</p>
                                    {file.size && (
                                      <p className="text-xs opacity-70">{formatFileSize(file.size)}</p>
                                    )}
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => downloadFile(file)}
                                    className="h-6 w-6 p-0 hover:bg-background/30"
                                  >
                                    <Download className="h-3 w-3" />
                                  </Button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex gap-2 max-w-[80%]">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="rounded-lg px-3 py-2 bg-muted">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <div>
                            <p className="text-sm">Thinking...</p>
                            <p className="text-xs opacity-70">This may take up to 5 minutes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Chatbot;