"use client";
import React, { useState } from "react";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import ChatSlider from "./components/ChatSlider";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  return (
    <div>
      <Navbar openChat={openChat} />
      {isChatOpen && <ChatSlider onClose={closeChat} />}
      <HomePage />
    </div>
  );
}
