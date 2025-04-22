import Image from 'next/image';
import Link from 'next/link';
import '../styles/GuideCards.scss';
import guidesData from '../data/GuideData';

export default function GuideCards({ searchCity }) {
  // Filter guides based on city (case-insensitive)
  const filteredGuides = searchCity
    ? guidesData.filter(
        (guide) => guide.city.toLowerCase() === searchCity.toLowerCase()
      )
    : guidesData;

  return (
    <div className="guide-card__container">
      <h1 className="guide-card__heading">
        {searchCity
          ? `Guides available in "${searchCity}"`
          : 'Here we found the Guides for You...'}
      </h1>

      <div className="guide-cards">
        {filteredGuides.length === 0 ? (
          <p className="guide-card__no-results">
            No guides found in "{searchCity}".
          </p>
        ) : (
          filteredGuides.map((guide, index) => (
            <Link
              href={`/guide/${guide.fullName.toLowerCase().replace(/\s+/g, '-')}`}
              key={index}
              className="guide-card"
              style={{ textDecoration: 'none' }}
            >
              <div className="guide-card__image">
                <Image
                  src={guide.profilePicture}
                  alt={guide.fullName}
                  width={200}
                  height={200}
                />
              </div>
              <div className="guide-card__content">
                <h2 className="guide-card__name">{guide.fullName}</h2>
                <p className="guide-card__location">{guide.city}</p>
                <p className="guide-card__price">₹{guide.hourlyRate} / hour</p>
                <p className="guide-card__quote">"{guide.motive}"</p>
                {guide.toursCompleted && (
                  <p className="guide-card__reviews">
                    Tours Completed: <span>{guide.toursCompleted}</span>
                  </p>
                )}
                <div className="guide-card__rating">
                  {'★'.repeat(Math.round(guide.rating))}
                  {'☆'.repeat(5 - Math.round(guide.rating))}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
