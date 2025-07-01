import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log(BASE_URL)
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/users/me`, { withCredentials: true });
      set({ authUser: res.data.user, isCheckingAuth: false });
    } catch (err) {
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  login: async (email, password, role) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/users/login`,
        { email, password, role },
        { withCredentials: true }
      );

      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  },

  signup: async (email, password, name, username, role) => {
    console.log(BASE_URL)
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/users/register`, {
        email,
        password,
        name,
        username,
        role,
      });

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed");
    }
  },

  verifyOtp: async (email, otp) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/users/verify-account`, { email, otp });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.error || "OTP verification failed");
    }
  },

  logout: async () => {
    try {
      await axios.post(`${BASE_URL}/api/v1/users/logout`, {}, { withCredentials: true });
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  },

  resendOtp: async (email) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/users/send-verify-otp`, { email });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to resend OTP");
    }
  },

  forgotPassword: async (email) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/users/send-reset-otp`, { email });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to send reset link");
    }
  },

  resetPassword: async (email, otp, newPassword) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/users/reset-password`, {
        email,
        otp,
        newPassword
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.error || "Reset failed");
    }
  },

}));
