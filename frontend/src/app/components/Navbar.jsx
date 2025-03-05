"use client";

import React from "react";
import Link from "next/link";
import "../styles/Navbar.scss";
import { Cinzel_Decorative, Kanit } from "next/font/google";
import { useRouter } from "next/navigation";

const cinzel = Cinzel_Decorative({ weight: "700", subsets: ["latin"] });
const kanit = Kanit({ weight: ["300", "400", "500"], subsets: ["latin"] });

function Navbar() {
  const router = useRouter();

  return (
    <nav className="navbar">
      <div className={`navbar-brand ${cinzel.className}`}>Tour Guide</div>
      <div className="navbar-links">
        <Link href="/tourist" className="nav-link kanit-light">
          Home
        </Link>
        <Link href="/tourist/booking" className="nav-link kanit-light">
          Book Guide
        </Link>
        <Link href="/my-bookings" className="nav-link kanit-light">
          My Bookings
        </Link>
        <Link href="/about" className="nav-link kanit-light">
          About Us
        </Link>
      </div>
      <div className="navbar-auth">
        <button
          className="auth-button kanit-medium"
          onClick={() => router.push("/auth/Login")}
        >
          Login
        </button>
        <button
          className="auth-button kanit-medium"
          onClick={() => router.push("/auth/SignUp")}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
