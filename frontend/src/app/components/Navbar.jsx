"use client";

import React from "react";
import Link from "next/link";
import "../styles/Navbar.scss";
import { Cinzel_Decorative, Kanit, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

const cinzel = Cinzel_Decorative({ weight: "700", subsets: ["latin"] });
const kanit = Kanit({ weight: ["300", "400", "500"], subsets: ["latin"] });
const poppins = Poppins({ weight:["300","500"], subsets: ["latin"]})

function Navbar() {
  const router = useRouter();

  return (
    <nav className="navbar">
      <div className={`navbar-brand ${cinzel.className}`}>GuidZo</div>
      <div className="navbar-links">
        <Link href="/" className="nav-link">
          Pro Guide
        </Link>
        <Link href="/tourist/local" className="nav-link">
          Local Guide
        </Link>
        <Link href="/bookings" className="nav-link">
          My Bookings
        </Link>
        <Link href="/benefits" className="nav-link">
          Benefits
        </Link>
        <Link href="/about" className="nav-link">
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
        <button
          className="secondary_auth-button kanit-medium"
          onClick={() => router.push("/guide")}
        >
          Switch to Guide
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
