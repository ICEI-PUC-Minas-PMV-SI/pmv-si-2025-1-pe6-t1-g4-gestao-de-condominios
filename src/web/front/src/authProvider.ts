import type { AuthProvider } from "@refinedev/core";
import { ErrorComponent } from "@refinedev/mui";
import Cookie from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { ApiUrl } from "./config/environment";
import { TOKEN_KEY } from "./config/constants";
import axiosInstance from "./services/http";


export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const response = await axiosInstance.post(`${ApiUrl}/auth`, {
      email,
      password
    });

    if (response.status === 200) {
      Cookie.set(TOKEN_KEY, response.data.token);

      return {
        success: true,
        redirectTo: "/",
      }
    }

    return {
      success: false,
      error: {
        message: response.data.message,
        name: "LoginError"
      }
    }
  },
  logout: async () => {
    Cookie.remove(TOKEN_KEY);

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = Cookie.get(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = Cookie.get(TOKEN_KEY);

    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (err) {
      console.error("Failed to decode token:", err);
      return null;
    }
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
