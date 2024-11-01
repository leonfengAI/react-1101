import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';
import { useThemeStore } from '../store/themeStore';
import '../css/ChatMessage.css';

interface ChatMessageProps {
  message: Message;
  onImageLoad?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onImageLoad }) => {
  const isBot = message.sender === 'bot';
  const { isDark } = useThemeStore();
  
  return (
    <div className={`message ${isBot ? 'message--bot' : 'message--user'}`}>
      {isBot && (
        <img
          src="/images/chatbot_icon.png"
          alt="Bot"
          className="avatar avatar--bot"
          loading="lazy"
        />
      )}
      <div className={`message-content ${
        isBot 
          ? isDark ? 'message-content--bot-dark' : 'message-content--bot-light'
          : isDark ? 'message-content--user-dark' : 'message-content--user-light'
      }`}>
        <div className="prose max-w-none markdown-content">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 {...props} className={`markdown-h1 ${isDark ? 'markdown-h1--dark' : 'markdown-h1--light'}`} />
              ),
              h2: ({ node, ...props }) => (
                <h2 {...props} className={`markdown-h2 ${isDark ? 'markdown-h2--dark' : 'markdown-h2--light'}`} />
              ),
              h3: ({ node, ...props }) => (
                <h3 {...props} className={`markdown-h3 ${isDark ? 'markdown-h3--dark' : 'markdown-h3--light'}`} />
              ),
              p: ({ node, ...props }) => (
                <p {...props} className={`markdown-p ${isDark ? 'markdown-p--dark' : 'markdown-p--light'}`} />
              ),
              a: ({ node, ...props }) => (
                <a {...props} className={`markdown-link ${isDark ? 'markdown-link--dark' : 'markdown-link--light'}`} target="_blank" rel="noopener noreferrer" />
              ),
              img: ({ node, ...props }) => (
                <img 
                  {...props} 
                  className="markdown-image" 
                  loading="lazy"
                  onLoad={onImageLoad}
                />
              ),
              table: ({ node, ...props }) => (
                <div className="table-container">
                  <table {...props} className={`markdown-table ${isDark ? 'markdown-table--dark' : 'markdown-table--light'}`} />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead {...props} className={`markdown-thead ${isDark ? 'markdown-thead--dark' : 'markdown-thead--light'}`} />
              ),
              tbody: ({ node, ...props }) => (
                <tbody {...props} className={`markdown-tbody ${isDark ? 'markdown-tbody--dark' : 'markdown-tbody--light'}`} />
              ),
              th: ({ node, ...props }) => (
                <th {...props} className={`markdown-th ${isDark ? 'markdown-th--dark' : 'markdown-th--light'}`} />
              ),
              td: ({ node, ...props }) => (
                <td {...props} className={`markdown-td ${isDark ? 'markdown-td--dark' : 'markdown-td--light'}`} />
              ),
              code: ({ node, inline, ...props }) => (
                inline 
                  ? <code {...props} className={`markdown-code-inline ${isDark ? 'markdown-code-inline--dark' : 'markdown-code-inline--light'}`} />
                  : <code {...props} className={`markdown-code-block ${isDark ? 'markdown-code-block--dark' : 'markdown-code-block--light'}`} />
              ),
              pre: ({ node, ...props }) => (
                <pre {...props} className={`markdown-pre ${isDark ? 'markdown-pre--dark' : 'markdown-pre--light'}`} />
              ),
              ul: ({ node, ...props }) => (
                <ul {...props} className="markdown-ul" />
              ),
              ol: ({ node, ...props }) => (
                <ol {...props} className="markdown-ol" />
              ),
              li: ({ node, ...props }) => (
                <li {...props} className={`markdown-li ${isDark ? 'markdown-li--dark' : 'markdown-li--light'}`} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote {...props} className={`markdown-blockquote ${isDark ? 'markdown-blockquote--dark' : 'markdown-blockquote--light'}`} />
              ),
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>
        <span className={`message-timestamp ${
          isBot 
            ? isDark ? 'message-timestamp--bot-dark' : 'message-timestamp--bot-light'
            : isDark ? 'message-timestamp--user-dark' : 'message-timestamp--user-light'
        }`}>
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
      {!isBot && (
        <img
          src="/images/user_icon.png"
          alt="User"
          className="avatar avatar--user"
          loading="lazy"
        />
      )}
    </div>
  );
};