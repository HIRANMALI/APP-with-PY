// pages/guide-dashboard.tsx

import styles from "@/app/styles/GuideDashboard.module.scss";
import Head from "next/head";
import NavbarGuide from "../components/NavbarGuide";

const GuideDashboard = () => {
    const recentBookings = [
        {
            destination: "Dwarka Temple Tour",
            date: "21st April, 2025",
            tourists: 4,
        },
        {
            destination: "Somnath Spiritual Trail",
            date: "18th April, 2025",
            tourists: 3,
        },
        {
            destination: "Rani Ki Vav Heritage Tour",
            date: "15th April, 2025",
            tourists: 6,
        },
    ];

    return (
        <>
            <Head>
                <title>Guide Dashboard | Guidzo</title>
            </Head>
            <NavbarGuide />
            <main className={styles.dashboard}>
                <header className={styles.header}>
                    <h2>Welcome back, Ramesh 👋</h2>
                    <p>Here’s what’s happening with your tours today</p>
                </header>

                <section className={styles.cards}>
                    {/* Earnings Overview */}
                    <div className={styles.card}>
                        <h3>💰 Earnings Overview</h3>
                        <p>Total Earnings: <strong>$1,250</strong></p>
                        <p>This Month: <strong>$320</strong></p>
                    </div>

                    {/* Upcoming Tour */}
                    <div className={styles.card}>
                        <h3>📍 Upcoming Tour</h3>
                        <p>Destination: <strong>Sasan Gir</strong></p>
                        <p>Date: <strong>25th April, 2025</strong></p>
                        <p>Time: <strong>10:00 AM</strong></p>
                        <p>Tourists: <strong>5</strong></p>
                        <p className={styles.status}>✅ Status: Confirmed</p>
                    </div>
                </section>

                <section className={styles.recentBookings}>
                    <h3>🕒 Recent Bookings</h3>
                    <ul>
                        {recentBookings.map((booking, index) => (
                            <li key={index}>
                                <strong>{booking.destination}</strong> — {booking.tourists} tourists — <em>{booking.date}</em>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </>
    );
};

export default GuideDashboard;
