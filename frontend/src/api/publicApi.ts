import axios from "axios";
import { urls } from "./urls";

export const publicApi = axios.create({
  baseURL: urls.base,
  withCredentials: true,
});
