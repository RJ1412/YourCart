import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";


export default function ForgotPasswordReset({ email, onClose }) {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const resetPassword = useAuthStore((state) => state.resetPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPassword(email, otp, newPassword);
      // Optionally: notify parent that reset succeeded
      onClose(); 
    } catch (error) {
      // error toast is already handled in the store
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
      <p className="text-center text-gray-600">
        Resetting password for <span className="font-semibold">{email}</span>
      </p>
      <input
        type="text"
        placeholder="Enter OTP"
        className="px-4 py-2 rounded-md border border-gray-300"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="New Password"
        className="px-4 py-2 rounded-md border border-gray-300"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-[#0d6efd] text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      <button
        type="button"
        onClick={onClose}
        className="cursor-pointer text-center text-sm text-gray-500 hover:underline mt-2"
      >
        Back
      </button>
    </motion.form>
  );
}
