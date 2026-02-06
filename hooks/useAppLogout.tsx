import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "@/redux/features/auth/authSlice";
import { useLogoutUserMutation } from "@/redux/features/auth/authApi";
import baseApi from "@/redux/baseApi";

export const useAppLogout = () => {
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser(undefined).unwrap();
      toast.success("Logged out successfully 👋");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.warn("Session ended. Please login again.");
    } finally {
      // 🔥 Frontend is source of truth
      dispatch(logout());
      dispatch(baseApi.util.resetApiState());
    }
  };

  return handleLogout;
};