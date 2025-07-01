import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";

export default function ForgotPasswordRequest({ onEmailSent }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPassword(email);
      onEmailSent(email);
    } catch (error) {
      // forgotPassword already shows toast in store
      // optional: you could set local error message if you want
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="flex flex-col gap-4"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="px-4 py-2 rounded-md border border-gray-300"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer bg-[#0d6efd] text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {loading ? "Sending..." : "Send Reset OTP"}
      </button>
    </motion.form>
  );
}
