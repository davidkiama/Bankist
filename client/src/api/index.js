import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });
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
