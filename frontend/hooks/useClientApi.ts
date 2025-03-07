import axios from 'axios';
import { getSession } from "next-auth/react";

// Create axios instance
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api', // Replace with your API base URL
  timeout: 3000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  async (config) => {
        const session = await getSession();
    if (session?.user?.access_token) {
        config.headers.Authorization = `Bearer ${session?.user?.access_token}`;
      }
      return config; 
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // Example: Redirect to login on unauthorized
     // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;



export const get = async (url: string, data: any) => {
  return await axiosClient.get(url, { ...data });
};

export const post = async (url: string, data: any) => {
  return await axiosClient.post(url, { ...data });
};

export const put = async (url: string, data: any) => {
  return await axiosClient.put(url, { ...data });
};

export const remove = async (url: string, data: any) => {
  return await axiosClient.delete(url, { ...data });
};
