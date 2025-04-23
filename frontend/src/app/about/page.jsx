"use client";

import Navbar from "../components/Navbar";
import "../about/about.scss";
import { Cinzel_Decorative } from "next/font/google";

const cinzel = Cinzel_Decorative({
    weight: "700",
    subsets: ["latin"]
});

export default function About() {
    return (
        <>
            <Navbar />
            <div className="about">
                <div className="about__hero">
                    <div className="about__hero-text kanit-light">
                        <h1 className={cinzel.className}>About Us</h1> {/* Added cinzel font here */}
                        <p>
                            Empowering travelers with local insights through trusted, verified guides.
                            <br />
                            Experience India like never before — safe, personal, and unforgettable.
                        </p>
                    </div>
                    <div className="about__hero-image">
                        <img src="/assets/aboutus.jpeg" alt="Travel support" />
                    </div>
                </div>

                <div className="about__cards kanit-light">
                    <div className="about__card">
                        <div className="about__card-icon">🌍</div>
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to connect tourists with experienced local guides to ensure safe,
                            authentic, and meaningful journeys through India’s cultural treasures.
                        </p>
                    </div>

                    <div className="about__card">
                        <div className="about__card-icon">💼</div>
                        <h2>What We Offer</h2>
                        <ul>
                            <li>✅ Verified and experienced local guides</li>
                            <li>✅ Easy online booking & secure payments</li>
                            <li>✅ Multilingual tour options</li>
                            <li>✅ Real-time support and flexible cancellations</li>
                        </ul>
                    </div>

                    <div className="about__card">
                        <div className="about__card-icon">📞</div>
                        <h2>Contact Us</h2>
                        <p>Follow us on social media or get in touch:</p>
                        <ul className="about__contact">
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}