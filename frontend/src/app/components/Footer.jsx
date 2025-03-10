"use client";

import "../styles/Footer.scss";

export default function Footer() {
    return (
        <footer className="footer">
      <div className="footer__container">
        {/* Navigation Links */}
        <ul className="footer__nav">
          <li className="footer__nav-item"><a href="/">Home</a></li>
          <li className="footer__nav-item"><a href="/about">About</a></li>
          <li className="footer__nav-item"><a href="/services">Services</a></li>
          <li className="footer__nav-item"><a href="/contact">Contact</a></li>
          <li className="footer__nav-item"><a href="/book-guide">Book a Guide</a></li>
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
        <form className="footer__form">
          <h3 className="footer__form-title">Send Us a Message</h3>
          <input type="text" className="footer__form-input" placeholder="Your Name" required />
          <input type="email" className="footer__form-input" placeholder="Your Email" required />
          <textarea className="footer__form-textarea" placeholder="Your Message" required></textarea>
          <button type="submit" className="footer__form-button">Send</button>
        </form>
      </div>
    </footer>
    );

}