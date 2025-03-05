"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/SignUp.scss"; // Import the SCSS file

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "tourist",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert(data.message);
      router.push("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signup">
      <form className="signup__form" onSubmit={handleSubmit}>
        <h2 className="signup__title">Sign Up</h2>
        <div className="signup__field">
          <label htmlFor="email" className="signup__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="signup__input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup__field">
          <label htmlFor="password" className="signup__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="signup__input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup__field">
          <label htmlFor="role" className="signup__label">
            Role
          </label>
          <select
            id="role"
            name="role"
            className="signup__select"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="tourist">Tourist</option>
            <option value="guide">Guide</option>
          </select>
        </div>

        <button type="submit" className="signup__button">
          Sign Up
        </button>

        <p className="signup__text">
          Already have an account?{" "}
          <button
            className="signup__link"
            onClick={() => router.push("/auth/Login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
