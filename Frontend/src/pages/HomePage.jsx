import { useState } from "react";
import { motion } from "framer-motion";
import RetailerLogin from "../components/RetailerLogin";
import UserLogin from "../components/Userlogin";
import SignUp from "../components/SignUp";
import ForgotPassword from "../components/ForgotPassword";
import YourCartTypeAnimation from "../components/YourCartTypeAnimation";
import { ShoppingBag, Store, UserPlus, KeyRound } from "lucide-react";

export default function HomePage() {
  const [mode, setMode] = useState("user");
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const renderForm = () => {
    if (showSignUp) return <SignUp onClose={() => setShowSignUp(false)} />;
    if (showForgotPassword) return <ForgotPassword onClose={() => setShowForgotPassword(false)} />;
    return mode === "user" ? <UserLogin /> : <RetailerLogin />;
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12
      bg-gradient-to-br from-[#d0ebff] via-[#ffe3e9] to-[#f8f9fa]">

      {/* ---------- Header ---------- */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 max-w-2xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#7b3e19] mb-5 tracking-tight leading-tight">
          <YourCartTypeAnimation />
        </h1>
        <p className="text-base md:text-lg text-[#5c3a28] max-w-2xl mx-auto leading-relaxed">
          Empowering seamless shopping experiences — connect with your favorite retailers and customers in one place.
        </p>
      </motion.div>

      {/* ---------- Form Section ---------- */}
      <motion.div
        className="relative w-full max-w-2xl rounded-xl md:rounded-2xl p-6 md:p-8
        backdrop-blur-lg bg-white/40 shadow-lg border border-[#e7d2ca]
        flex flex-col gap-7"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >

        {/* ---------- Header Icon ---------- */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-[#d0ebff] to-[#ffe3e9] rounded-full p-4 shadow border border-[#e7d2ca]">
            {mode === "user" ? (
              <ShoppingBag className="w-9 h-9 text-[#7b3e19]" />
            ) : (
              <Store className="w-9 h-9 text-[#7b3e19]" />
            )}
          </div>
        </div>

        {/* ---------- Tabs ---------- */}
        {!showSignUp && !showForgotPassword && (
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setMode("user")}
              className={`cursor-pointer  px-5 py-2 rounded-full font-medium text-base border transition-all duration-300 shadow-sm ${
                mode === "user"
                  ? "bg-[#d0ebff]/80 text-[#7b3e19] border-[#7b3e19]"
                  : "bg-white/50 text-[#5c3a28] border-[#e7d2ca] hover:bg-[#fdf6f3]"
              }`}
            >
              User
            </button>
            <button
              onClick={() => setMode("retailer")}
              className={`cursor-pointer px-5 py-2 rounded-full font-medium text-base border transition-all duration-300 shadow-sm ${
                mode === "retailer"
                  ? "bg-[#ffe3e9]/80 text-[#7b3e19] border-[#7b3e19]"
                  : "bg-white/50 text-[#5c3a28] border-[#e7d2ca] hover:bg-[#fdf6f3]"
              }`}
            >
              Retailer
            </button>
          </div>
        )}

        {/* ---------- Form Content ---------- */}
        <div className="flex flex-col gap-5 mt-3">
          {renderForm()}
        </div>

        {/* ---------- Links ---------- */}
        {!showSignUp && !showForgotPassword && (
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-6 text-sm text-[#5c3a28]">
            <button
              className="cursor-pointer flex items-center gap-2 hover:underline transition-colors"
              onClick={() => setShowSignUp(true)}
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign up</span>
            </button>
            <span className="hidden md:inline-block">|</span>
            <button
              className="cursor-pointer flex items-center gap-2 hover:underline transition-colors"
              onClick={() => setShowForgotPassword(true)}
            >
              <KeyRound className="w-4 h-4" />
              <span>Forgot Password?</span>
            </button>
          </div>
        )}
      </motion.div>

      {/* ---------- Footer ---------- */}
      <motion.div
        className="mt-12 max-w-xl text-center text-[#7b3e19] text-sm px-4 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <p>
          Built with love for modern retail. Experience convenience, trust, and style with{" "}
          <span className="font-semibold underline decoration-[#7b3e19]/40">YourCart</span>.
        </p>
      </motion.div>
    </div>
  );
}
