"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/SignUp.scss";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      alert("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData), // Must match what backend expects
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      sessionStorage.setItem("user", JSON.stringify({ email: formData.email }));

      router.push("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <form className="signup__form" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="signup__title">Login</h2>

        <div className="signup__field">
          <label htmlFor="email" className="signup__label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="signup__input"
            autoComplete="new-email"
            value={formData.email}
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
            autoComplete="new-password"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="signup__button" disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </button>

        <p className="signup__text">
          Don’t have an account?{" "}
          <button
            type="button"
            className="signup__link"
            onClick={() => router.push("/auth/SignUp")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
