import React, { useState, useRef, useEffect } from 'react';
import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon, PaperAirplaneIcon } from './Icons';
import { sendChatMessage } from '../services/geminiService';
import MarkdownRenderer from './MarkdownRenderer';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: 'Hello! I am the Cyber Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponseText = await sendChatMessage(userMessage.text);
            const aiMessage: Message = { sender: 'ai', text: aiResponseText };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = { sender: 'ai', text: 'Sorry, I am having trouble connecting. Please try again later.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <h3 className="text-lg font-bold font-orbitron text-white">Cyber Assistant</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div ref={chatBodyRef} className="chat-body custom-scrollbar">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}>
                            {msg.sender === 'ai' ? <MarkdownRenderer text={msg.text} /> : msg.text}
                        </div>
                    ))}
                    {isLoading && (
                         <div className="ai-message">
                            <div className="typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                </div>
                <form onSubmit={handleSendMessage} className="chat-input-form">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        className="chat-input"
                        disabled={isLoading}
                    />
                    <button type="submit" className="chat-send-button" disabled={isLoading}>
                        <PaperAirplaneIcon className="w-5 h-5 text-gray-900" />
                    </button>
                </form>
            </div>
            {!isOpen && (
                <button onClick={() => setIsOpen(true)} className="chat-toggle-button">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8 text-gray-900" />
                </button>
            )}
        </div>
    );
};

export default Chatbot;