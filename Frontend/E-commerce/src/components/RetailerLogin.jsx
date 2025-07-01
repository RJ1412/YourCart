import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore"; // adjust path if needed

export default function RetailerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password, "RETAILER");
      // Optionally clear form
      setEmail("");
      setPassword("");
    } catch (err) {
      // Store already shows error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="email"
        placeholder="Retailer Email"
        className="input px-4 py-2 rounded-md border border-gray-300"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="input px-4 py-2 rounded-md border border-gray-300"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer btn-primary bg-[#0d6efd] text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {loading ? "Logging in..." : "Login as Retailer"}
      </button>
    </motion.form>
  );
}
