"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import "../styles/Navbar.scss";
import { Cinzel_Decorative, Kanit, Poppins } from "next/font/google";
import { FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const cinzel = Cinzel_Decorative({ weight: "700", subsets: ["latin"] });
const kanit = Kanit({ weight: ["300", "400", "500"], subsets: ["latin"] });
const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccessToken(); // ⬅️ auto-refresh logic
  }, [pathname]);

  useEffect(() => {
    console.log("👀 Checking cookies in browser:", document.cookie);
    console.log("DEBUG COOKIE:", document.cookie);
  }, []);


  const fetchAccessToken = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/auth/refresh/", {
        method: "POST",
        credentials: "include", // refresh token is stored in HttpOnly cookie
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (res.ok) {
        const data = await res.json();
        const accessToken = data.access;

        // ⬇️ Decode access token to get user info
        const decoded = jwtDecode(accessToken);
        setIsAuthenticated(true);
        setUser({ name: decoded.username });
        console.log("✅ Access token refreshed, user authenticated");
      } else {
        setIsAuthenticated(false);
        setUser(null);
        console.warn("⚠️ Not authenticated - refresh failed");
      }
    } catch (err) {
      console.error("Auth refresh error:", err);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/auth/logout/", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      setDropdownOpen(false);
      router.push("/");
    }
  };

  if (loading) {
    return <div className="navbar-loading">Loading...</div>;
  }

  return (
    <nav className="navbar">
      <div className={`navbar-brand ${cinzel.className}`}>GuidZo</div>
      <div className="navbar-links">
        <Link href="/" className="nav-link">Pro Guide</Link>
        <Link href="/tourist/local" className="nav-link">Local Guide</Link>
        <Link href="/bookings" className="nav-link">My Bookings</Link>
        <Link href="/benefits" className="nav-link">Benefits</Link>
        <Link href="/about" className="nav-link">About Us</Link>
      </div>

      <div className="navbar-auth">
        {!isAuthenticated ? (
          <>
            <button className="auth-button kanit-medium" onClick={() => router.push("/auth/Login")}>Login</button>
            <button className="auth-button kanit-medium" onClick={() => router.push("/auth/SignUp")}>Sign Up</button>
            <button className="secondary_auth-button kanit-medium" onClick={() => router.push("/guide")}>Switch to Guide</button>
          </>
        ) : (
          <div className="profile-dropdown">
            <FaUserCircle
              size={32}
              className="profile-icon"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ color: "black" }}
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <p className="user-name">{user?.name}</p>
                <button onClick={() => { router.push("/guide"); setDropdownOpen(false); }}>Sign in as Pro Guide</button>
                <button onClick={() => { router.push("/tourist/local"); setDropdownOpen(false); }}>Sign in as Local Guide</button>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
