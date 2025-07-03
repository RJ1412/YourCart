import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function LoggedInDashboard() {
  const authUser = useAuthStore((s) => s.authUser);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  // ✅ Redirect to home if logged out
  useEffect(() => {
    if (!authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  if (!authUser) return null;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-[#d0ebff] via-[#ffe3e9] to-[#f8f9fa]">
      <div className="max-w-md w-full bg-white/40 backdrop-blur-lg p-8 rounded-xl shadow border border-[#e7d2ca] flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-[#7b3e19]">
          Welcome, {authUser.name || authUser.email}!
        </h2>
        <p className="text-[#5c3a28]">Role: {authUser.role}</p>
        <button
          onClick={logout}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
