'use client';
import React, { useState } from "react";
import '@/app/styles/ChatSlider.scss';

const guides = [
    { id: 1, name: "Ravi (Sasan Gir)" },
    { id: 2, name: "Kavita (Dwarka)" },
    { id: 3, name: "Ajay (Ahmedabad)" },
];

export default function ChatSlider({ onClose }) {
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleGuideSelect = (guide) => {
        setSelectedGuide(guide);
        setMessages([
            { sender: 'guide', text: `Hello! I'm ${guide.name}. How can I help?` }
        ]);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        const input = e.target.elements.message;
        const newMessage = input.value.trim();
        if (!newMessage) return;

        setMessages(prev => [...prev, { sender: 'user', text: newMessage }]);
        input.value = '';
    };

    return (
        <div className="chat-slider">
            <div className="chat-header">
                {selectedGuide ? (
                    <>
                        <button onClick={() => setSelectedGuide(null)} className="chat-close">←</button>
                        <h2 className="chat-title">{selectedGuide.name}</h2>
                        <button onClick={onClose} className="chat-close">✖</button>
                    </>
                ) : (
                    <>
                        <h2 className="chat-title">Choose a Guide</h2>
                        <button onClick={onClose} className="chat-close">✖</button>
                    </>
                )}
            </div>

            {!selectedGuide ? (
                <div className="guide-list">
                    {guides.map((guide) => (
                        <div
                            key={guide.id}
                            className="guide-button"
                            onClick={() => handleGuideSelect(guide)}
                        >
                            {guide.name}
                        </div>
                    ))}
                </div>

            ) : (
                <>
                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chat-message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <form className="chat-form" onSubmit={handleSendMessage}>
                        <input name="message" type="text" placeholder="Type a message..." className="chat-input" />
                        <button type="submit" className="chat-send">Send</button>
                    </form>
                </>
            )}
        </div>
    );
}
