import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export const api_key = process.env.REACT_APP_API_KEY;
