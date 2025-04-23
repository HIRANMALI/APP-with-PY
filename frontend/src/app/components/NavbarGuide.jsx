"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "../styles/NavbarGuide.scss";
import { Cinzel_Decorative, Kanit, Poppins } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faComments } from "@fortawesome/free-solid-svg-icons";

const cinzel = Cinzel_Decorative({ weight: "700", subsets: ["latin"] });
const kanit = Kanit({ weight: ["300", "400", "500"], subsets: ["latin"] });
const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] })

function NavbarGuide() {
  const router = useRouter();
  const pathname = usePathname(); // Get current path

  return (
    <nav className="navbar">
      <div className={`navbar-brand ${cinzel.className}`}>GuidZo</div>
      <div className="navbar-links">
        <Link
          href="/guide"
          className={`nav-link ${pathname === "/guide" ? "active-link" : ""}`}
        >
          Dashboard
        </Link>
        <Link
          href="/guide/bookings"
          className={`nav-link ${pathname === "/guide/bookings" ? "active-link" : ""}`}
        >
          Bookings
        </Link>
        <Link
          href="/guide/ratings"
          className={`nav-link ${pathname === "/guide/ratings" ? "active-link" : ""}`}
        >
          My Ratings
        </Link>
      </div>
      <div className="navbar-auth" style={{ gap: "1.5rem" }}>
        <button className="kanit-medium" onClick={() => router.push("/auth/Login")}>
          <FontAwesomeIcon icon={faComments} size="lg" style={{ marginRight: "10px" }} />
        </button>
        <button className="kanit-medium" onClick={() => router.push("/auth/SignUp")}>
          <FontAwesomeIcon icon={faUser} size="lg" />
        </button>
        <button className="secondary_auth-button kanit-medium" onClick={() => router.push("/")}>
          Switch to Tourist
        </button>
      </div>
    </nav>
  );
}

export default NavbarGuide;
