import { useState } from "react";
import { motion } from "framer-motion";
import ForgotPasswordRequest from "./ForgotPasswordRequest";
import ForgotPasswordReset from "./ForgotPasswordReset";

export default function ForgotPassword({ onClose }) {
  const [email, setEmail] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-4 text-left"
    >
      <h2 className="text-2xl font-bold text-center text-[#0d6efd] mb-2">Forgot Password</h2>

      {email ? (
        <ForgotPasswordReset email={email} onClose={onClose} />
      ) : (
        <ForgotPasswordRequest onEmailSent={setEmail} />
      )}

      <button
        onClick={onClose}
        className="cursor-pointer mt-4 text-center text-sm text-gray-500 hover:underline"
      >
        Back
      </button>
    </motion.div>
  );
}
