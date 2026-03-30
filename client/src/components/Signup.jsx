import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock, User, Check, X } from "lucide-react";
import { useAuthStore } from "../stores/authStore.js";
import { toast } from "react-hot-toast";

const Signup = ({ switchToLogin }) => {
  const sendOtp = useAuthStore((state) => state.sendOtp);
  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const loading = useAuthStore((state) => state.loading);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errors, setErrors] = useState({});
  const otpInputRef = useRef(null);

  useEffect(() => {
    if (step === 2 && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [step]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validateStep1 = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return false;
    }
    return true;
  };

  const handleSendOtp = async (e) => {
    e?.preventDefault();
    if (!validateStep1()) return;

    try {
      await sendOtp(email, fullName, password);
      setOtpSent(true);
      setStep(2);
      setCountdown(60);
      toast.success("OTP sent to your email!");
    } catch (err) {
      const errorMsg = err.response?.data?.message 
        || err.response?.data?.error 
        || err.response?.data 
        || "Failed to send OTP. Please try again.";
      toast.error(errorMsg);
    }
  };

  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    if (!validateStep2()) return;

    try {
      await verifyOtp(email, otp);
      toast.success("Account created successfully!");
    } catch (err) {
      const errorMsg = err.response?.data?.message 
        || err.response?.data?.error 
        || err.response?.data 
        || "Invalid OTP. Please try again.";
      toast.error(errorMsg);
    }
  };

  const handleBack = () => {
    setStep(1);
    setOtp("");
    setOtpSent(false);
    setErrors({});
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    try {
      await sendOtp(email, fullName, password);
      setCountdown(60);
      toast.success("OTP resent!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-serif text-stone-800">
          {step === 1 ? "Create Account" : "Verify Email"}
        </h2>
        <p className="text-stone-500 text-sm mt-1">
          {step === 1
            ? "Join us to start shopping"
            : `Enter the code sent to ${email}`}
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center gap-2 mb-4">
        <div
          className={`w-8 h-1 rounded-full transition-colors ${
            step === 1 ? "bg-amber-600" : "bg-amber-200"
          }`}
        />
        <div
          className={`w-8 h-1 rounded-full transition-colors ${
            step === 2 ? "bg-amber-600" : "bg-stone-200"
          }`}
        />
      </div>

      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: "" });
                }}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${
                  errors.fullName
                    ? "border-red-400"
                    : "border-stone-300 focus:border-amber-700"
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <X size={12} /> {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />
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
                    ? "border-red-400"
                    : "border-stone-300 focus:border-amber-700"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <X size={12} /> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${
                  errors.password
                    ? "border-red-400"
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
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <X size={12} /> {errors.password}
              </p>
            )}
            {/* Password strength indicator */}
            {password && (
              <div className="mt-2 flex gap-1">
                <div
                  className={`h-1 flex-1 rounded-full ${
                    password.length >= 6 ? "bg-green-400" : "bg-stone-200"
                  }`}
                />
                <div
                  className={`h-1 flex-1 rounded-full ${
                    password.length >= 8 && /[A-Z]/.test(password)
                      ? "bg-green-400"
                      : "bg-stone-200"
                  }`}
                />
                <div
                  className={`h-1 flex-1 rounded-full ${
                    password.length >= 10 && /[0-9]/.test(password)
                      ? "bg-green-400"
                      : "bg-stone-200"
                  }`}
                />
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword)
                    setErrors({ ...errors, confirmPassword: "" });
                }}
                className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${
                  errors.confirmPassword
                    ? "border-red-400"
                    : confirmPassword && password === confirmPassword
                    ? "border-green-400"
                    : "border-stone-300 focus:border-amber-700"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showConfirmPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
            {errors.confirmPassword ? (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <X size={12} /> {errors.confirmPassword}
              </p>
            ) : confirmPassword && password === confirmPassword ? (
              <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                <Check size={12} /> Passwords match
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5C4033] text-white py-2.5 rounded-lg text-sm font-medium tracking-wide hover:bg-[#4a352a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Sending..." : "Continue"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          {/* OTP Display */}
          <div className="bg-amber-50 rounded-lg p-4 text-center">
            <p className="text-stone-600 text-sm">We've sent a verification code to</p>
            <p className="font-semibold text-amber-800 mt-1">{email}</p>
          </div>

          {/* OTP Input */}
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1.5 text-center">
              Enter 6-digit code
            </label>
            <input
              ref={otpInputRef}
              type="text"
              inputMode="numeric"
              placeholder="_ _ _ _ _ _"
              value={otp}
              onChange={handleOtpChange}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg text-center text-xl tracking-[0.5em] font-mono focus:outline-none focus:border-amber-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-[#5C4033] text-white py-2.5 rounded-lg text-sm font-medium tracking-wide hover:bg-[#4a352a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Verifying..." : "Verify & Create Account"}
          </button>

          <button
            type="button"
            onClick={handleBack}
            className="w-full text-stone-500 text-sm hover:text-stone-700 transition-colors py-2"
          >
            ← Change details
          </button>

          <div className="text-center pt-2">
            {countdown > 0 ? (
              <p className="text-stone-400 text-sm">
                Resend code in {countdown}s
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-amber-700 font-medium hover:underline text-sm"
              >
                Resend verification code
              </button>
            )}
          </div>
        </form>
      )}

      <div className="text-center pt-2 border-t border-stone-100">
        <span className="text-stone-500 text-sm">Already have an account?</span>{" "}
        <button
          onClick={switchToLogin}
          className="text-amber-700 font-medium hover:underline text-sm"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Signup;
