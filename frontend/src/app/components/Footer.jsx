"use client";

import { useState } from "react";
import "../styles/Footer.scss";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:8000/auth/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (error) {
      alert("Failed to send message!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Navigation Links */}
        <ul className="footer__nav">
          <li className="footer__nav-item"><a href="/">Home</a></li>
          <li className="footer__nav-item"><a href="/tourist/local">Local Guide</a></li>
          <li className="footer__nav-item"><a href="/bookings">My Bookings</a></li>
          <li className="footer__nav-item"><a href="/benefits">Benefits</a></li>
          <li className="footer__nav-item"><a href="/about">About Us</a></li>
        </ul>

        {/* Social Media Links */}
        <ul className="footer__social">
          <li className="footer__social-item">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          </li>
          <li className="footer__social-item">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </li>
          <li className="footer__social-item">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </li>
          <li className="footer__social-item">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </li>
        </ul>

        {/* Contact Form */}
        <form className="footer__form" onSubmit={handleSubmit}>
          <h3 className="footer__form-title">Send Us a Message</h3>
          <input
            type="text"
            name="name"
            className="footer__form-input"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="footer__form-input"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            className="footer__form-textarea"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="footer__form-button" disabled={submitting}>
            {submitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </footer>
  );
}
