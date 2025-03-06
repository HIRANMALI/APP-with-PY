"use client";

// import { useState } from "react";
import { useRef } from "react";
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
  {
    name: "Goa Beaches",
    description: "Golden sands and endless fun in Goa.",
    image: Goa,
  },
];

export default function HomePage() {
  const router = useRouter();
  const swiperRef = useRef(null);

  return (
    <div className="homepage">
      <header>
        <div className="container">
          <h3 className="homepage__title kanit-light">
            Discover Gujarat's Iconic Places
          </h3>
          <p className="homepage__description kanit-light">
            Discover India's wonders beyond the guidebooks. From the timeless
            beauty of the Taj Mahal to Kerala's serene backwaters, our certified
            guides bring each landmark to life. Book now for an unforgettable
            journey.
          </p>

          <button
            className="homepage__button cinzel-decorative-bold"
            onClick={() => router.push("/tourist/booking")}
          >
            Find a Guide
          </button>
        </div>
      </header>

      {/* Swiper Slider */}
      <section
        className="cards-container"
        onMouseEnter={() => swiperRef.current?.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay.start()}
      >
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={3}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
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
  );
}
