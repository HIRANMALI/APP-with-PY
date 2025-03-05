"use client"; 

// import { useState } from "react";
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
//   const [location, setLocation] = useState(null);

  return (
    <div className="homepage" >
      <header>
        {/* <Navbar /> */}
        <div className="container">
          <h3 className="homepage__title kanit-light">Discover Gujarat's Iconic Places</h3>
          <p className="homepage__description kanit-light">
            Discover India's wonders beyond the guidebooks. From the timeless beauty
            of the Taj Mahal to Kerala's serene backwaters, our certified guides bring
            each landmark to life. Book now for an unforgettable journey.
          </p>

          <button className="homepage__button cinzel-decorative-bold" onClick={() => router.push("/tourist/booking")}>
            Find a Guide
          </button>
        </div>
      </header>

      <section className="cards-container">
        {touristSpots.map((spot, index) => (
          <div className="card" key={index}>
            <Image src={spot.image} alt={spot.name} className="card__image" width={300} height={200} />
            <div className="card__content">
              <h5 className="card__title kanit-regular">{spot.name}</h5>
              <p className="card__description kanit-light">{spot.description}</p>
            </div>
            <div className="card__actions">
              <button className="card__button kanit-regular" onClick={() => router.push("/tourist/booking")}>
                Book a Guide
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
