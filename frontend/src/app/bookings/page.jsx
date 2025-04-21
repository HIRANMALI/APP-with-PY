"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./mybooking.scss"

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            const userId = sessionStorage.getItem("userId");
    
            if (!userId) {
                console.warn("No userId found in sessionStorage.");
                setLoading(false);
                return;
            }
    
            try {
                const res = await fetch(`http://localhost:8000/bookings/${userId}/`);
    
                if (!res.ok) {
                    throw new Error("Error fetching bookings");
                }
    
                const data = await res.json();
                console.log("Fetched bookings:", data); // ✅ Add this line
                setBookings(data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchBookings();
    }, []);
    

    return (
        <>
            <Navbar />
            <div className="my-bookings">
                <h2 className="my-bookings__title">My Bookings</h2>
                {loading ? (
                    <p className="my-bookings__message">Loading bookings...</p>
                ) : bookings.length === 0 ? (
                    <p className="my-bookings__message">No bookings found.</p>
                ) : (
                    <ul className="my-bookings__list">
                        {bookings.map((b) => (
                            <li className="my-bookings__item" key={b.id}>
                                <div className="my-bookings__info">
                                    <span className="my-bookings__label">Date:</span>
                                    <span className="my-bookings__value">{b.date}</span>
                                </div>
                                <div className="my-bookings__info">
                                    <span className="my-bookings__label">Location:</span>
                                    <span className="my-bookings__value">{b.location}</span>
                                </div>
                                <div className="my-bookings__info">
                                    <span className="my-bookings__label">Time Slot:</span>
                                    <span className="my-bookings__value">{b.time_slot}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
