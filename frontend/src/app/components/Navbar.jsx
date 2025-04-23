"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/Navbar.scss";
import { Cinzel_Decorative, Kanit, Poppins } from "next/font/google";
import { FaUserCircle, FaCommentDots } from "react-icons/fa";

const cinzel = Cinzel_Decorative({ weight: "700", subsets: ["latin"] });
const kanit = Kanit({ weight: ["300", "400", "500"], subsets: ["latin"] });
const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

function Navbar({ openChat }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    console.log("Fetched userId from sessionStorage:", userId); // DEBUG
    if (userId) {
      fetch(`http://localhost:8000/auth/guide-dashboard/${userId}/`)
        .then(res => res.json())
        .then(data => {
          if (data.role) {
            setUserRole(data.role); // role = "local,tourist"
          }
        });
    }
  }, []);

  return (
    <nav className="navbar">
      <div className={`navbar-brand ${cinzel.className}`}>GuidZo</div>
      <div className="navbar-links">
      <Link
  href="/"
  className={`nav-link ${pathname === "/" ? "active-link" : ""}`}
  prefetch
>
  Pro Guide
</Link>
<Link
  href="/tourist/local"
  className={`nav-link ${pathname === "/tourist/local" ? "active-link" : ""}`}
  prefetch
>
  Local Guide
</Link>
<Link
  href="/bookings"
  className={`nav-link ${pathname === "/bookings" ? "active-link" : ""}`}
  prefetch
>
  My Bookings
</Link>
<Link
  href="/benefits"
  className={`nav-link ${pathname === "/benefits" ? "active-link" : ""}`}
  prefetch
>
  Benefits
</Link>
<Link
  href="/about"
  className={`nav-link ${pathname === "/about" ? "active" : ""}`}
  prefetch
>
  About Us
</Link>
      </div>

      <div className="navbar-auth">
        {!isAuthenticated ? (
          <>
            <Link href="/auth/Login" className="auth-button kanit-medium" prefetch>
              Login
            </Link>
            <Link href="/auth/SignUp" className="auth-button kanit-medium" prefetch>
              Sign Up
            </Link>
            <Link href="/guide" className="secondary_auth-button kanit-medium" prefetch>
              Switch to Guide
            </Link>
          </>
        ) : (
          <div className="navbar__icons">
            {/* <Link href="/chat" className="navbar__icon-link"> */}

            {isAuthenticated && (
              <button onClick={() => {
                console.log("Chat icon clicked");
                openChat();
              }} className="navbar__icon-link">
                <FaCommentDots size={28} style={{ color: "black" }} />
              </button>
            )}
            {/* </Link> */}

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
                  <Link href="/register/pro" onClick={() => setDropdownOpen(false)} className="dropdown-menu__btn">
                    Register as Pro Guide
                  </Link>
                 {userRole ? (
                    userRole.includes("local") ? (
                <Link
                  href="/guide"
                  onClick={() => setDropdownOpen(false)}
                  className="dropdown-menu__btn"
                >
                  Switch to Local Guide
                </Link>
                ) : (
                <Link
                  href="/register/local"
                  onClick={() => setDropdownOpen(false)}
                  className="dropdown-menu__btn"
                >
                  Register as Local Guide
                </Link>
                )
                ) : (
                  <p className="dropdown-menu__btn">Checking role...</p>
                )}

                  <button onClick={handleLogout}>Log Out</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;