import { useState } from "react";
import { createGStore } from "create-gstore";
import { jwtDecode } from "jwt-decode";
import { publicFetchClient } from "../api/instance";
import { ApiSchemas } from "../api/schema";

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh_token";

type Session = {
  type: string;
  sub: string;
  name: string;
  exp: number;
  iat: number;
  jti: string;
};

let refreshTokenPromise: Promise<ApiSchemas["TokenInfo"] | null> | null = null;

export const useSession = createGStore(() => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem(REFRESH_TOKEN_KEY),
  );

  const login = ({ access_token, refresh_token }: ApiSchemas["TokenInfo"]) => {
    localStorage.setItem(TOKEN_KEY, access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token!);
    setToken(access_token);
    setRefreshToken(refresh_token!);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setToken(null);
    setRefreshToken(null);
  };

  const isAuth = !!token;

  const refreshTokenHandle = async () => {
    if (!token || typeof token !== "string" || token.split(".").length !== 3) {
      logout();
      return null;
    }

    let session: Session;
    try {
      session = jwtDecode<Session>(token);
    } catch (e) {
      console.error("Ошибка декодирования токена:", e);
      logout();
      return null;
    }

    if (session.exp < Date.now() / 1000) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = publicFetchClient
          .POST("/api/v1/auth/refresh", {
            body: { refresh_token: refreshToken },
          })
          .then((r) => r.data?.data ?? null)
          .then((newToken) => {
            if (newToken) {
              login(newToken);
              return newToken;
            } else {
              logout();
              return null;
            }
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      const newToken = await refreshTokenPromise;

      return newToken?.access_token ?? null;
    }

    return token;
  };  

  return { refreshTokenHandle, login, logout, isAuth };
});
