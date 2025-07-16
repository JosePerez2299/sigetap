import type { LoginResponseType } from "../types/authTypes";

const getTokens = () => {
  const tokens = {
    access: sessionStorage.getItem("accessToken"),
    refresh: sessionStorage.getItem("refreshToken"),
    user: sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo")!)
      : null,
  };

  return tokens;
};

const deleteSession = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("userInfo");
};

const setAfterLogin = (data: LoginResponseType) => {
  const { access, refresh, user } = data;
  if (access) setAccessToken(access);
  if (refresh) setRefreshToken(refresh);
  if (user) setUser(user);
};

const setAccessToken = (access: string) => {
  sessionStorage.setItem("accessToken", access);
};
const setRefreshToken = (refresh: string) => {
  sessionStorage.setItem("refreshToken", refresh);
};
const setUser = (user: any) => {
  sessionStorage.setItem("userInfo", JSON.stringify(user));
};

const getUser = () => {
  const userInfo = sessionStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : null;
};

export const tokenManager = {
  getTokens,
  deleteSession,
  setAfterLogin,
  setAccessToken,
  setRefreshToken,
  setUser,
  getUser,
};
