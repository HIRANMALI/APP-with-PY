"use client";

import Navbar from "@/app/components/Navbar";
import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/LocalGuide.scss";
import GuideCards from "../../components/GuideCards";
import Footer from "../../components/Footer";

export default function LocalGuide() {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [city, setCity] = useState('');
  const suggestions = ["Ahmedabad", "Surat", "Dwarka", "Somnath"];

  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleSearch = () => {
    setCity(search.trim());
  };

  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (city) => {
    setSearch(city);
    setShowSuggestions(false);
  };

  return (
    <>
      <Navbar />
      <header className="local__header">
        <h1 className="local__heading">
          <span className="local__heading--bold">FIND A LOCAL GUIDE</span> TO
          LIVE THE HISTORY
        </h1>
        <div className="search-bar__container" ref={wrapperRef}>
          <FaSearch className="search-bar__icon" />
          <input
            type="text"
            className="search-bar__input"
            placeholder="Search City..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCity(e.target.value)}
              }
            onFocus={() => setShowSuggestions(true)}
            ref={inputRef}
          />
          <button className="search-bar__button" onClick={handleSearch}>
            LOCAL GUIDE
          </button>
          {showSuggestions && (
            <ul className="suggestions__dropdown">
              {suggestions.map((city) => (
                <li
                  key={city}
                  className="suggestions__item"
                  onClick={() => handleSuggestionClick(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
      <GuideCards searchCity={city} />

      <Footer />
    </>
  );
}
