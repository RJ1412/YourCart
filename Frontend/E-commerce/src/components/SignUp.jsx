import { useState } from "react";
import { motion } from "framer-motion";

import OtpForm from "./OtpForm";
import SignUpForm from "./SignupForm";

export default function SignUp({ onClose }) {
  const [emailForOtp, setEmailForOtp] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-4 text-left"
    >
      <h2 className="text-2xl font-bold text-center text-[#0d6efd] mb-2">Sign Up</h2>
      {emailForOtp ? (
        <OtpForm email={emailForOtp} onClose={onClose} />
      ) : (
        <SignUpForm onOtpSent={setEmailForOtp} />
      )}

      <button
        onClick={onClose}
        className="mt-4 text-center text-sm text-gray-500 hover:underline"
      >
        Back
      </button>
    </motion.div>
  );
}
