"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";

import './LocalGuideForm.scss';

const LocalGuideForm = () => {
  const [formData, setFormData] = useState({
    motive: '',
    profilePicture: null,
    aboutMe: '',
    hourlyRate: '',
    city: '',
    languages: '',
    activities: '',
  });

  const router = useRouter(); // ✅ move here, top level of component

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const { motive, profilePicture, aboutMe, hourlyRate, city, languages, activities } = formData;
    if (
      !motive.trim() ||
      !profilePicture ||
      !aboutMe.trim() ||
      !hourlyRate ||
      !city.trim() ||
      !languages.trim() ||
      !activities.trim()
    ) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      form.append("userId", sessionStorage.getItem("userId"));

      const response = await fetch("http://localhost:8000/auth/register/local/", {
        method: "POST",
        body: form,
        credentials: "include", // important for Django session auth
      });

      if (response.ok) {
        alert("Registration successful!");
        router.push("/guide");
      } else {
        const data = await response.json();
        alert(`Registration failed: ${data.error || response.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <form className="guide-form" onSubmit={handleSubmit}>
      <h2 className="guide-form__title">Become a Local Guide</h2>

      <div className="guide-form__group">
        <label className="guide-form__label" htmlFor="motive">Motive</label>
        <input
          type="text"
          name="motive"
          id="motive"
          className="guide-form__input"
          value={formData.motive}
          onChange={handleChange}
          placeholder="Why do you want to be a guide?"
        />
      </div>

      <div className="guide-form__group">
        <label className="guide-form__label" htmlFor="profilePicture">Profile Picture</label>
        <input
          type="file"
          name="profilePicture"
          id="profilePicture"
          className="guide-form__input"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <div className="guide-form__group">
        <label className="guide-form__label" htmlFor="aboutMe">About Me</label>
        <textarea
          name="aboutMe"
          id="aboutMe"
          className="guide-form__textarea"
          value={formData.aboutMe}
          onChange={handleChange}
          placeholder="Tell us about yourself"
        />
      </div>

      <div className="guide-form__group">
        <label className="guide-form__label" htmlFor="hourlyRate">Hourly Rate (₹)</label>
        <input
          type="number"
          name="hourlyRate"
          id="hourlyRate"
          className="guide-form__input"
          value={formData.hourlyRate}
          onChange={handleChange}
        />
      </div>

      <div className="guide-form__group">
        <label className="guide-form__label" htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          className="guide-form__input"
          value={formData.city}
          onChange={handleChange}
        />
      </div>

      <div className="guide-form__group">
        <label className="guide-form__label" htmlFor="languages">Languages</label>
        <input
          type="text"
          name="languages"
          id="languages"
          className="guide-form__input"
          placeholder="e.g., Hindi, English, French"
          value={formData.languages}
          onChange={handleChange}
        />
      </div>

      <div className="guide-form__group">
        <label className="guide-form__label" htmlFor="activities">Activities</label>
        <input
          type="text"
          name="activities"
          id="activities"
          className="guide-form__input"
          placeholder="e.g., Trekking, Local food tour"
          value={formData.activities}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="guide-form__submit">Submit</button>
    </form>
  );
};

export default LocalGuideForm;
