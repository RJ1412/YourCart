import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";


export default function OtpForm({ email, onClose }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = useAuthStore((state) => state.verifyOtp);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await verifyOtp(email, otp);
      // Maybe close the OTP form on success
      onClose();
    } catch (err) {
      // Errors are already shown via toast in the store
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
        Enter the OTP sent to <span className="font-semibold">{email}</span>
      </p>
      <input
        type="text"
        name="otp"
        placeholder="6-digit OTP"
        className="px-4 py-2 rounded-md border border-gray-300"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-[#0d6efd] text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {loading ? "Verifying..." : "Verify OTP"}
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
