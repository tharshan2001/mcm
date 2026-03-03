import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore.js";

const Login = ({ switchToSignup }) => {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      alert("Login successful!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-stone-800">Welcome Back</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-700"
        />
        <button
          type="submit"
          className="w-full bg-[#5C4033] text-white py-2 rounded-lg text-sm tracking-wide hover:bg-amber-800 transition-colors"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="text-center text-sm text-stone-600">
        Don't have an account?{" "}
        <button
          onClick={switchToSignup}
          className="ml-1 text-amber-800 font-medium hover:underline"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;