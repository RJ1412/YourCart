import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";

export default function SignUpForm({ onOtpSent }) {
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [loading, setLoading] = useState(false);
  const signup = useAuthStore((state) => state.signup);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup(
        form.email,
        form.password,
        form.name,
        form.username,
        form.role
      );

      // SUCCESS: clear fields, notify parent to show OTP form
      setForm({
        username: "",
        name: "",
        email: "",
        password: "",
        role: "USER",
      });

      onOtpSent(form.email);

    } catch (err) {
      // Store already shows toast error, so just stay on form
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
        name="username"
        placeholder="Username"
        className="px-4 py-2 rounded-md border border-gray-300"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        name="name"
        placeholder="Full Name"
        className="px-4 py-2 rounded-md border border-gray-300"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="px-4 py-2 rounded-md border border-gray-300"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="px-4 py-2 rounded-md border border-gray-300"
        value={form.password}
        onChange={handleChange}
        required
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="px-4 py-2 rounded-md border border-gray-300"
        required
      >
        <option value="USER">User</option>
        <option value="RETAILER">Retailer</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer  bg-[#0d6efd] text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {loading ? "Registering..." : "Send OTP"}
      </button>
    </motion.form>
  );
}
