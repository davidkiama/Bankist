import axios from "axios";

const API = axios.create({ baseURL: "https://bankist-backend.herokuapp.com/" });
const profile = localStorage.getItem("profile");

API.interceptors.request.use((req) => {
  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }

  return req;
});

// Auth functions
export const signUp = (user) => API.post("auth/signup", user);
export const signIn = (user) => API.post("auth/signin", user);

// Transaction functions
export const deposit = (amount) => API.post("transaction/deposit", amount);
export const withdraw = (amount) => API.post("transaction/withdraw", amount);
export const transfer = (body) => API.post("transaction/transfer", body);
export const loan = (amount) => API.post("transaction/loan", amount);

// Dashboard info
export const dashboardInfo = () => API.get("transaction/dashboard");
