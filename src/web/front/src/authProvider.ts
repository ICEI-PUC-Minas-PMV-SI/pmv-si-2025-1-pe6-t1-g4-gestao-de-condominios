import type { AuthProvider } from "@refinedev/core";

export const TOKEN_KEY = "refine-auth";
const VITE_API_URL = import.meta.env.VITE_API_URL;


export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const response = await fetch(`${VITE_API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Login failed");
      }

      const data = await response.json();
      const token = data.token;

      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Token not received",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: error.message || "Unexpected error during login",
        },
      };
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
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
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
