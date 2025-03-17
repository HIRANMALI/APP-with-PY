import Image from 'next/image';
import '../styles/GuideCards.scss';

export default function GuideCards() {
  const guides = [
    {
      name: 'Yash',
      location: 'Mumbai, India',
      price: 'Free',
      quote: 'Merging local expertise with warm hospitality',
      reviews: 2,
      rating: 3,
      image: '/assets/Me & Dhruv 2.jpg',
    },
    {
      name: 'Lfm',
      location: 'Mumbai, India',
      price: '$26/h',
      quote: 'Manifest',
      reviews: 48,
      rating: 5,
      image: '/assets/Me & Dhruv 2.jpg',
    },
    {
      name: 'Aditi',
      location: 'Delhi, India',
      price: '$15/h',
      quote: 'Experience the city like a local',
      reviews: 30,
      rating: 4,
      image: '/assets/Me & Dhruv 2.jpg',
    },
    {
      name: 'Rahul',
      location: 'Goa, India',
      price: 'Free',
      quote: 'Discover hidden gems with me',
      reviews: 10,
      rating: 4,
      image: '/assets/Me & Dhruv 2.jpg',
    },
    {
      name: 'Yash',
      location: 'Mumbai, India',
      price: 'Free',
      quote: 'Merging local expertise with warm hospitality',
      reviews: 2,
      rating: 3,
      image: '/assets/Me & Dhruv 2.jpg',
    },{
      name: 'Yash',
      location: 'Mumbai, India',
      price: 'Free',
      quote: 'Merging local expertise with warm hospitality',
      reviews: 2,
      rating: 3,
      image: '/assets/Me & Dhruv 2.jpg',
    },{
      name: 'Yash',
      location: 'Mumbai, India',
      price: 'Free',
      quote: 'Merging local expertise with warm hospitality',
      reviews: 2,
      rating: 3,
      image: '/assets/Me & Dhruv 2.jpg',
    },{
      name: 'Yash',
      location: 'Mumbai, India',
      price: 'Free',
      quote: 'Merging local expertise with warm hospitality',
      reviews: 2,
      rating: 3,
      image: '/assets/Me & Dhruv 2.jpg',
    },
  ];

  return (
    <div className="guide-card__container">
    <h1 className="guide-card__heading">Here we found the Guides for You...</h1>
    <div className="guide-cards">
      {guides.map((guide, index) => (
        <div key={index} className="guide-card">
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
        </div>
      ))}
    </div>
    </div>
  );
}
