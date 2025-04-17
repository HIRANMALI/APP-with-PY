'use client';
import React from 'react';
import guidesData from '../data/GuideData'; // ✅ Importing mock data
import '../styles/GuideProfile.scss';
import Navbar from './Navbar';

const GuideProfile = ({ name }) => {
  // Convert route param to match fullName (like "raj-patel" → "Raj Patel")
  const formatName = (slug) =>
    slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const formattedName = formatName(name);
  const guide = guidesData.find(g => g.fullName === formattedName);

  if (!guide) return <p>Guide not found</p>;

  return (
    <>
      <Navbar />
      <div className="guide-profile">
        <div className="guide-profile__header">
          <img
            src={guide.profilePicture}
            alt={guide.fullName}
            className="guide-profile__photo"
          />
          <div className="guide-profile__intro">
            <h1 className="guide-profile__name">{guide.fullName}</h1>
            <p className="guide-profile__location">{guide.city}</p>
            <p className="guide-profile__quote">“{guide.motive}”</p>
            <span className="guide-profile__price">₹{guide.hourlyRate} / hour</span>
          </div>
        </div>

        <div className="guide-profile__content">
          <div className="guide-profile__section">
            <h2 className="guide-profile__title">I will show you</h2>
            <p className="guide-profile__text">Local gems and cultural heritage of {guide.city}</p>
          </div>

          <div className="guide-profile__section">
            <h2 className="guide-profile__title">About me</h2>
            <p className="guide-profile__text">
              I am a {guide.age}-year-old {guide.type === 'pro' ? 'professional' : 'local'} guide from {guide.city}. 
              {guide.type === 'pro' && guide.toursCompleted && ` I have completed ${guide.toursCompleted}+ tours.`}
            </p>
          </div>

          <div className="guide-profile__section">
            <h2 className="guide-profile__title">Languages</h2>
            <p className="guide-profile__text">
              {guide.languages ? guide.languages.join(', ') : 'Not specified'}
            </p>
          </div>

          <div className="guide-profile__section">
            <h2 className="guide-profile__title">Activities</h2>
            <ul className="guide-profile__activities">
              <li>City tours</li>
              <li>Local food discovery</li>
              <li>Culture and temples</li>
              <li>Photo walk</li>
            </ul>
          </div>

          <div className="guide-profile__contact">
            <p className="guide-profile__rating">
              {'★'.repeat(Math.round(guide.rating))}{'☆'.repeat(5 - Math.round(guide.rating))} ({guide.rating} stars)
            </p>
            <button className="guide-profile__btn">Contact {guide.fullName}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideProfile;
