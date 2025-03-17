"use client";

import Navbar from "@/app/components/Navbar";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/LocalGuide.scss";
import GuideCards from "@/app/components/GuideCards";
import Footer from "@/app/components/Footer";

export default function LocalGuide() {
      const [search, setSearch] = useState("");

      const handleSearch = () => {
        console.log("Search Query:", search);
        console.log("Filter:", filter);
      };
    
    return(
        <>
        <Navbar />
        <header className="local__header">
        <h1 className="local__heading">
            <span className="local__heading--bold">FIND A LOCAL GUIDE</span> TO LIVE THE HISTORY
          </h1>
          <div className="search-bar__container">
                      <FaSearch className="search-bar__icon"  />
                      <input
                        type="text"
                        className="search-bar__input"
                        placeholder="Search City..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <button className="search-bar__button" onClick={handleSearch}>
                        LOCAL GUIDE
                      </button>
                    </div>
        </header>
        <GuideCards />
        <Footer />
        </>
    );
}