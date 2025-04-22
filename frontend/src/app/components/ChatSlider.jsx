'use client';
import React, { useState } from "react";
import '@/app/styles/ChatSlider.scss';
import guideData from "../data/GuideData";

export default function ChatSlider({ onClose }) {
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleGuideSelect = (guide) => {
        setSelectedGuide(guide);
        setMessages([
            { sender: 'guide', text: `Hello! I'm ${guide.fullName} from ${guide.city}. How can I help?` }
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

    const filteredGuides = guideData.filter(guide =>
        `${guide.fullName} ${guide.city}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="chat-slider">
            <div className="chat-header">
                {selectedGuide ? (
                    <>
                        <button onClick={() => setSelectedGuide(null)} className="chat-close">←</button>
                        <h2 className="chat-title">{selectedGuide.fullName} ({selectedGuide.city})</h2>
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
                <div className="guide-list-container">
                    <input
                        type="text"
                        placeholder="Search guides..."
                        className="guide-search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <div className="guide-list">
                        {filteredGuides.length > 0 ? (
                            filteredGuides.map((guide, index) => (
                                <div
                                    key={index}
                                    className="guide-button"
                                    onClick={() => handleGuideSelect(guide)}
                                >
                                    {guide.fullName} ({guide.city})
                                </div>
                            ))
                        ) : (
                            <p style={{ padding: "1rem", color: "#888" }}>No guides found.</p>
                        )}
                    </div>
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
