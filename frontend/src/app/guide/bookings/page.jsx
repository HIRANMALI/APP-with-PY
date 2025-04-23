"use client";

import NavbarGuide from "@/app/components/NavbarGuide";
import styles from '@/app/styles/bookings.module.scss';

export default function Bookings() {
    // Fake booking data
    const upcomingBookings = [
        {
            id: 1,
            tourName: "Heritage Walk of Ahmedabad",
            date: "2025-05-15",
            time: "09:00 AM",
            guests: 4,
            status: "Confirmed"
        },
        {
            id: 2,
            tourName: "Surat Street Food Tour",
            date: "2025-05-20",
            time: "06:30 PM",
            guests: 2,
            status: "Pending"
        }
    ];

    const activeBookings = [
        {
            id: 3,
            tourName: "Sabarmati Ashram Tour",
            date: "2025-04-25",
            time: "10:00 AM",
            guests: 3,
            status: "Ongoing"
        }
    ];

    const completedBookings = [
        {
            id: 4,
            tourName: "Kankaria Lake Evening",
            date: "2025-04-10",
            time: "05:00 PM",
            guests: 5,
            status: "Completed",
            rating: 4.5
        },
        {
            id: 5,
            tourName: "Adalaj Stepwell Exploration",
            date: "2025-03-28",
            time: "11:00 AM",
            guests: 2,
            status: "Completed",
            rating: 5
        }
    ];

    return (
        <div className={styles.container}>
            <NavbarGuide />

            <div className={styles.bookingsSections}>
                {/* Upcoming Bookings */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Upcoming ({upcomingBookings.length})</h2>
                    <div className={styles.bookingCards}>
                        {upcomingBookings.length > 0 ? (
                            upcomingBookings.map(booking => (
                                <BookingCard key={booking.id} booking={booking} type="upcoming" />
                            ))
                        ) : (
                            <div className={styles.placeholder}>No upcoming bookings</div>
                        )}
                    </div>
                </section>

                {/* Active Bookings */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Active ({activeBookings.length})</h2>
                    <div className={styles.bookingCards}>
                        {activeBookings.length > 0 ? (
                            activeBookings.map(booking => (
                                <BookingCard key={booking.id} booking={booking} type="active" />
                            ))
                        ) : (
                            <div className={styles.placeholder}>No active bookings</div>
                        )}
                    </div>
                </section>

                {/* Completed Bookings */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Completed ({completedBookings.length})</h2>
                    <div className={styles.bookingCards}>
                        {completedBookings.length > 0 ? (
                            completedBookings.map(booking => (
                                <BookingCard key={booking.id} booking={booking} type="completed" />
                            ))
                        ) : (
                            <div className={styles.placeholder}>No completed bookings</div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

// Booking Card Component
function BookingCard({ booking, type }) {
    const statusColors = {
        Confirmed: "#4CAF50",
        Pending: "#FFC107",
        Ongoing: "#2196F3",
        Completed: "#9E9E9E"
    };

    return (
        <div className={styles.bookingCard}>
            <div className={styles.cardHeader}>
                <h3 className={styles.tourName}>{booking.tourName}</h3>
                <span
                    className={styles.statusBadge}
                    style={{ backgroundColor: statusColors[booking.status] }}
                >
                    {booking.status}
                </span>
            </div>

            <div className={styles.cardDetails}>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Date:</span>
                    <span>{booking.date}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Time:</span>
                    <span>{booking.time}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Guests:</span>
                    <span>{booking.guests} {booking.guests > 1 ? 'people' : 'person'}</span>
                </div>
            </div>

            {type === "completed" && booking.rating && (
                <div className={styles.rating}>
                    <span className={styles.detailLabel}>Your rating:</span>
                    <div className={styles.stars}>
                        {Array(5).fill(0).map((_, i) => (
                            <span
                                key={i}
                                className={`${styles.star} ${i < booking.rating ? styles.filled : ''}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.cardActions}>
                {type === "upcoming" && (
                    <>
                        <button className={styles.actionButton}>Modify</button>
                        <button className={`${styles.actionButton} ${styles.cancelButton}`}>Cancel</button>
                    </>
                )}
                {type === "active" && (
                    <button className={styles.actionButton}>View Details</button>
                )}
                {type === "completed" && (
                    <button className={styles.actionButton}>Leave Review</button>
                )}
            </div>
        </div>
    );
}