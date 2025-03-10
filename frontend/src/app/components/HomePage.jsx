"use client";

// import { useState } from "react";
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import Image from "next/image";
import tajMahal from "../assests/Taj Mahal.jpg";
import Jaipur from "../assests/Jaipur City Palace.jpg";
import Kerala from "../assests/Kerala Blackwaters.jpg";
import Varanasi from "../assests/Varansai Ghats.jpg";
import Goa from "../assests/Goa Beaches.jpg";
// import backgroundImage from "../assests/";
// import Navbar from "@/components/Navbar";
import "@/app/styles/HomePage.scss"; 
import { Cinzel_Decorative, Kanit } from "next/font/google";
import Section2 from "./Section2";
import Footer from "./footer";

const kanit = Kanit({ weight: ["300", "400", "500"], subsets: ["latin"] });

// Array of tourist spots
const touristSpots = [
  {
    name: "Taj Mahal",
    description: "A stunning symbol of love in Agra.",
    image: tajMahal,
  },
  {
    name: "Jaipur City Palace",
    description: "A magnificent blend of Mughal and Rajasthani architecture.",
    image: Jaipur,
  },
  {
    name: "Kerala Backwaters",
    description: "Experience the serene backwaters of Kerala.",
    image: Kerala,
  },
  {
    name: "Varanasi Ghats",
    description: "Spiritual heart of India along the Ganges.",
    image: Varanasi,
  },
 
];


export default function HomePage() {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("city-tour");

  const handleSearch = () => {
    console.log("Search Query:", search);
    console.log("Filter:", filter);
  };

  return (
    <div className="homepage">
      <header className="background-image">
          <div className="search-bar">
          <h1 className="search-bar__heading">
            <span className="search-bar__heading--bold">FIND A GUIDE</span> TO LIVE THE HISTORY
          </h1>
          <div className="search-bar__container">
            <FaSearch className="search-bar__icon" />
            <input
              type="text"
              className="search-bar__input"
              placeholder="Enter City or Destination"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="search-bar__filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="city">City</option>
              <option value="destination">Destination</option>
            </select>
            <button className="search-bar__button" onClick={handleSearch}>
              FIND GUIDE
            </button>
          </div>
          <p className="search-bar__destinations">
            <strong>Top Destinations:</strong> Somnath Temple, Dwarakadhish Temple, Ambaji, Sasan Gir National Park
          </p>
        </div>
      </header>
      
      {/* Swiper Slider */}
      <div className="slider__container">
          <h1 className="slider__title cinzel-decorative-bold">Places you should Visit....</h1>
          <section
            className="cards-container"
            onMouseEnter={() => swiperRef.current?.autoplay.stop()}
            onMouseLeave={() => swiperRef.current?.autoplay.start()}
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              slidesPerView={3}
              spaceBetween={250}
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="w-full"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {touristSpots.map((spot, index) => (
                <SwiperSlide key={index} className="p-4">
                  <div className="card bg-white rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src={spot.image}
                      alt={spot.name}
                      className="card__image w-full h-48 object-cover"
                      width={300}
                      height={200}
                    />
                    <div className="card__content p-4">
                      <h5 className="card__title kanit-regular">{spot.name}</h5>
                      <p className="card__description kanit-light">
                        {spot.description}
                      </p>
                    </div>
                    <div className="card__actions p-4">
                      <button
                        className="card__button kanit-regular bg-orange-500 text-white px-4 py-2 rounded"
                        onClick={() => router.push("/tourist/booking")}
                      >
                        Book a Guide
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </div>

              <Section2 />
              <Footer />
      
          
    </div>
  );
}
