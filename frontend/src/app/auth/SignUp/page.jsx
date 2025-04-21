"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/SignUp.scss";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",  // Browser will store cookies set by the backend
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("Parsed data:", data);
      if (!response.ok) throw new Error(data.message || "Signup failed");

      sessionStorage.setItem("user", JSON.stringify({ name: data.username }));
      sessionStorage.setItem("userId", data.userId); // Or response.user.id
  
      // Auto-login if backend sets auth cookies
      router.push("/");  // Redirect to homepage
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <form className="signup__form" onSubmit={handleSubmit}>
        <h2 className="signup__title">Sign Up</h2>

        <div className="signup__field">
          <label htmlFor="email" className="signup__label">Email</label>
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
          <label htmlFor="name" className="signup__label">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="signup__input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup__field">
          <label htmlFor="password" className="signup__label">Password</label>
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

        <button type="submit" className="signup__button" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="signup__text">
          Already have an account?{" "}
          <button
            type="button"
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
