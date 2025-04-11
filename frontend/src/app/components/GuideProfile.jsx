'use client';
import React from 'react';
import guidesData from '../data/GuideData'; // ✅ Importing data
import '../styles/GuideProfile.scss';
import Navbar from './Navbar';

const GuideProfile = ({ name }) => {
  // Find the guide using the name passed as prop
  const guide = guidesData.find(g => g.name.toLowerCase() === name.toLowerCase());

  if (!guide) return <p>Guide not found</p>;

  return (
    <>
    <Navbar />
    
    <div className="guide-profile">
      <div className="guide-profile__header">
        <img src={guide.image} alt={guide.name} className="guide-profile__photo" />
        <div className="guide-profile__intro">
          <h1 className="guide-profile__name">{guide.name}</h1>
          <p className="guide-profile__location">{guide.location}</p>
          <p className="guide-profile__quote">“{guide.quote}”</p>
          <span className="guide-profile__price">{guide.price}</span>
        </div>
      </div>

      <div className="guide-profile__content">
        <div className="guide-profile__section">
          <h2 className="guide-profile__title">I will show you</h2>
          <p className="guide-profile__text">{guide.experience || 'Experience details not available'}</p>
        </div>

        <div className="guide-profile__section">
          <h2 className="guide-profile__title">About me</h2>
          <p className="guide-profile__text">{guide.about || 'About section not available'}</p>
        </div>

        <div className="guide-profile__section">
          <h2 className="guide-profile__title">Languages</h2>
          <p className="guide-profile__text">{guide.languages ? guide.languages.join(', ') : 'Not specified'}</p>
        </div>

        <div className="guide-profile__section">
          <h2 className="guide-profile__title">Activities</h2>
          <ul className="guide-profile__activities">
            {guide.activities ? guide.activities.map((activity, i) => (
              <li key={i} className="guide-profile__activity">
                {activity}
              </li>
            )) : <li>No activities listed</li>}
          </ul>
        </div>

        <div className="guide-profile__contact">
          <p className="guide-profile__rating">
            {'★'.repeat(guide.stars)}{'☆'.repeat(5 - guide.stars)} ({guide.reviews} reviews)
          </p>
          <button className="guide-profile__btn">Contact {guide.name}</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default GuideProfile;
