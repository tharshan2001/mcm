import React, { useState } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { useAuthStore } from "../stores/authStore.js";
import { toast } from "react-hot-toast";

const Login = ({ switchToSignup }) => {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await login({ email, password });
      toast.success("Welcome back!");
    } catch (err) {
      const errorMsg = err.response?.data?.message 
        || err.response?.data?.error 
        || err.response?.data 
        || "Login failed. Please check your credentials.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-serif text-stone-800">Welcome Back</h2>
        <p className="text-stone-500 text-sm mt-1">Sign in to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-stone-600 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${
                errors.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-stone-300 focus:border-amber-700"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-stone-600 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${
                errors.password
                  ? "border-red-400 focus:border-red-500"
                  : "border-stone-300 focus:border-amber-700"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#5C4033] text-white py-2.5 rounded-lg text-sm font-medium tracking-wide hover:bg-[#4a352a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="text-center pt-2">
        <span className="text-stone-500 text-sm">Don't have an account?</span>{" "}
        <button
          onClick={switchToSignup}
          className="text-amber-700 font-medium hover:underline text-sm"
        >
          Create one
        </button>
      </div>
    </div>
  );
};

export default Login;
