"use client";

import React from "react";
import Link from "next/link";
import "../styles/Navbar.scss";
import { Cinzel_Decorative, Kanit } from "next/font/google";

const cinzel = Cinzel_Decorative({ weight: "700", subsets: ["latin"] });
const kanit = Kanit({ weight: ["300", "400", "500"], subsets: ["latin"] });

function Navbar() {
  return (
    <nav className="navbar">
      <div className={`navbar-brand ${cinzel.className}`}>GuidZo</div>
      <div className="navbar-links">
        <Link href="/tourist" className={`nav-link ${kanit.className}`} style={{ fontWeight: 300 }}>
          Home
        </Link>
        <Link href="/tourist/booking" className={`nav-link ${kanit.className}`} style={{ fontWeight: 300 }}>
          Book Guide
        </Link>
        <Link href="/my-bookings" className={`nav-link ${kanit.className}`} style={{ fontWeight: 300 }} >
          My Bookings
        </Link>
        <Link href="/about" className={`nav-link ${kanit.className}`} style={{ fontWeight: 300 }}>
          About Us
        </Link>
      </div>
      <div className="navbar-auth">
        <button className={`auth-button ${kanit.className}`} style={{ fontWeight: 400 }}>Login</button>
        <button className={`auth-button ${kanit.className}`} style={{ fontWeight: 400 }}>Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;
