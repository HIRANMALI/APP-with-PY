"use client";

import React from "react";
import Link from "next/link";
import "../styles/Navbar.scss";
import { Cinzel_Decorative, Kanit, Poppins } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faComments } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const cinzel = Cinzel_Decorative({ weight: "700", subsets: ["latin"] });
const kanit = Kanit({ weight: ["300", "400", "500"], subsets: ["latin"] });
const poppins = Poppins({ weight:["300","500"], subsets: ["latin"]})

function NavbarGuide() {
  const router = useRouter();

  return (
    <nav className="navbar">
      <div className={`navbar-brand ${cinzel.className}`}>GuidZo</div>
      <div className="navbar-links">
        <Link href="/guide" className="nav-link">
          Dashboard
        </Link>
        <Link href="/guide/bookings" className="nav-link">
          Bookings
        </Link>
        <Link href="/guide/ratings" className="nav-link">
          My Ratings
        </Link>
      </div>
      <div className="navbar-auth"
           style={{gap:"1.5rem"}}
      >
        <button
          className=" kanit-medium"
          onClick={() => router.push("/auth/Login")}
        >
          <FontAwesomeIcon icon={faComments} size="lg" style={{ marginRight: "10px" }} />
        </button>
        <button
          className=" kanit-medium"
          onClick={() => router.push("/auth/SignUp")}
        >
          <FontAwesomeIcon icon={faUser} size="lg" />
        </button>
        <button
          className="secondary_auth-button kanit-medium"
          onClick={() => router.push("/")}
        >
          Switch to Tourist
        </button>
      </div>
    </nav>
  );
}

export default NavbarGuide;
