import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Smile, Paperclip } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const WhatsAppChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! 👋 Terima kasih sudah mengunjungi portfolio saya. Ada yang bisa saya bantu?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const botResponses = [
    "Terima kasih sudah menghubungi! Saya akan segera membalas pesan Anda.",
    "Itu pertanyaan yang menarik! Mari kita diskusikan lebih lanjut.",
    "Saya senang Anda tertarik dengan portfolio saya. Apa yang ingin Anda ketahui lebih lanjut?",
    "Portfolio saya mencakup berbagai project menarik. Apakah ada teknologi tertentu yang ingin Anda tanyakan?",
    "Saya selalu terbuka untuk kolaborasi dan project baru. Mari kita bicarakan ide Anda!",
    "Pengalaman saya di bidang web development sudah lebih dari 5 tahun. Apa yang bisa saya bantu?"
  ];

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
          isOpen ? 'scale-110 rotate-180' : 'hover:scale-110'
        } nav-3d`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        
        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">1</span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 z-50 w-80 h-96 bg-background border border-border rounded-lg shadow-2xl transition-all duration-500 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
      }`}>
        
        {/* Chat Header */}
        <div className="bg-green-500 text-white p-4 rounded-t-lg flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-lg">👨‍💻</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-xs opacity-80">Online</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto h-64 bg-gray-50 dark:bg-gray-900">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-bubble flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 text-sm ${
                    message.sender === 'user'
                      ? 'chat-bubble-user text-white'
                      : 'chat-bubble-bot text-white'
                  }`}
                >
                  <p className="mb-1">{message.text}</p>
                  <p className={`text-xs ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-300'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="chat-bubble-bot px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-border bg-background rounded-b-lg">
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-primary transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-primary transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pesan..."
              className="flex-1 px-3 py-2 border border-border rounded-full focus:outline-none focus:border-primary transition-colors bg-background text-foreground"
            />
            <button
              onClick={sendMessage}
              className="bg-primary hover:bg-primary/80 text-primary-foreground p-2 rounded-full transition-all duration-300 nav-3d"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsAppChat;