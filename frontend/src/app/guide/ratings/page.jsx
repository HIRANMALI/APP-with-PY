"use client";

import NavbarGuide from "@/app/components/NavbarGuide";
import styles from '@/app/styles/ratings.module.scss';

export default function Ratings() {
    // Sample ratings data
    const ratings = [
        {
            id: 1,
            tourName: "Heritage Walk of Ahmedabad",
            date: "2025-04-15",
            rating: 4.5,
            review: "Excellent tour guide with deep knowledge of Ahmedabad's history.",
            traveler: "Rahul Sharma",
            travelerAvatar: "/assets/magnus.png"
        },
        {
            id: 2,
            tourName: "Surat Street Food Tour",
            date: "2025-03-28",
            rating: 5,
            review: "Amazing food experience! Knew all the hidden gems.",
            traveler: "Priya Patel",
            travelerAvatar: "/assets/vantika.png"
        },
        {
            id: 3,
            tourName: "Sabarmati Ashram Visit",
            date: "2025-03-10",
            rating: 4,
            review: "Very informative tour of Gandhi's ashram.",
            traveler: "Amit Joshi",
            travelerAvatar: "/assets/vidit.jpeg"
        }
    ];

    // Calculate average rating
    const averageRating = (ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length).toFixed(1);

    return (
        <div className={styles.container}>
            <NavbarGuide />

            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.title}>My Ratings</h1>
                    <p className={styles.subtitle}>Feedback from your travelers</p>
                </div>

                <div className={styles.ratingSummary}>
                    <div className={styles.averageRating}>
                        <div className={styles.averageNumber}>{averageRating}</div>
                        <div className={styles.stars}>
                            {Array(5).fill(0).map((_, i) => (
                                <span
                                    key={i}
                                    className={`${styles.star} ${i < averageRating ? styles.filled : ''}`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <div className={styles.ratingCount}>{ratings.length} ratings</div>
                    </div>

                    <div className={styles.ratingDistribution}>
                        {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className={styles.ratingBar}>
                                <span className={styles.starLabel}>{star} star</span>
                                <div className={styles.barContainer}>
                                    <div
                                        className={styles.bar}
                                        style={{
                                            width: `${(ratings.filter(r => Math.floor(r.rating) === star).length / ratings.length * 100)}%`
                                        }}
                                    ></div>
                                </div>
                                <span className={styles.count}>
                                    ({ratings.filter(r => Math.floor(r.rating) === star).length})
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.ratingsList}>
                    {ratings.map((rating) => (
                        <div key={rating.id} className={styles.ratingCard}>
                            <div className={styles.ratingHeader}>
                                <div className={styles.travelerInfo}>
                                    <img
                                        src={rating.travelerAvatar}
                                        alt={rating.traveler}
                                        className={styles.avatar}
                                    />
                                    <div>
                                        <h3 className={styles.travelerName}>{rating.traveler}</h3>
                                        <div className={styles.stars}>
                                            {Array(5).fill(0).map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`${styles.star} ${i < rating.rating ? styles.filled : ''}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.tourInfo}>
                                    <span className={styles.tourName}>{rating.tourName}</span>
                                    <span className={styles.date}>{rating.date}</span>
                                </div>
                            </div>

                            <div className={styles.review}>
                                <p>{rating.review}</p>
                            </div>

                            <div className={styles.actions}>
                                <button className={styles.actionButton}>Thank Traveler</button>
                                <button className={styles.actionButton}>Respond</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}