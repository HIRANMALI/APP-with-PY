import Image from 'next/image';
import Link from 'next/link';
import '../styles/GuideCards.scss';
import guides from '../data/GuideData';

export default function GuideCards() {
  return (
    <div className="guide-card__container">
      <h1 className="guide-card__heading">Here we found the Guides for You...</h1>
      <div className="guide-cards">
        {guides.map((guide, index) => (
          <Link href={`/guide/${guide.name.toLowerCase()}`} key={index} className="guide-card" style={{textDecoration:"none"}}> 
            <div className="guide-card__image">
              <Image src={guide.image} alt={guide.name} width={200} height={200} />
            </div>
            <div className="guide-card__content">
              <h2 className="guide-card__name">{guide.name}</h2>
              <p className="guide-card__location">{guide.location}</p>
              <p className="guide-card__price">{guide.price}</p>
              <p className="guide-card__quote">"{guide.quote}"</p>
              <p className="guide-card__reviews">Reviews: <span>{guide.reviews}</span></p>
              <div className="guide-card__rating">
                {'★'.repeat(guide.rating)}{'☆'.repeat(5 - guide.rating)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}