"use client";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import ChatSlider from "@/app/components/ChatSlider";

export default function RootLayout({ children }) {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <html lang="en">
            <body>
                <Navbar openChat={() => setIsChatOpen(true)} />
                <ChatSlider isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
                {children}
            </body>
        </html>
    );
}
