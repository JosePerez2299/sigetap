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

const setTokens = (data: LoginResponseType) => {
  const { access, refresh, user } = data;
  sessionStorage.setItem("accessToken", access);
  sessionStorage.setItem("refreshToken", refresh);
  sessionStorage.setItem("userInfo", JSON.stringify(user));
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
  setTokens,
  setUser,
  getUser,
};
