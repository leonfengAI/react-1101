import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from '../types';
import { useThemeStore } from '../store/themeStore';
import { useLanguageStore } from '../store/languageStore';
import '../css/ChatWindow.css';

interface ChatWindowProps {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
}

export const ChatWindow = ({ messages, input, setInput, handleSend }: ChatWindowProps) => {
  const { isDark } = useThemeStore();
  const { t } = useLanguageStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`chat-window ${isDark ? 'chat-window--dark' : 'chat-window--light'}`}>
      <div className="messages-container scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {messages.map(message => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            onImageLoad={scrollToBottom}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={`input-container ${isDark ? 'input-container--dark' : 'input-container--light'}`}>
        <div className="input-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className={`message-input ${isDark ? 'message-input--dark' : 'message-input--light'}`}
            rows={1}
          />
          <button
            onClick={handleSend}
            className="send-button"
          >
            {t('send')}
          </button>
        </div>
      </div>
    </div>
  );
};