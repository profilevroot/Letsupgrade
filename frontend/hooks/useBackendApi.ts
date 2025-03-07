import axios from "axios";
import { serverSession } from "@/lib/session";
 
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, //base URL for server
  timeout: 3000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

//Request header
instance.interceptors.request.use(
  async function (config) {
    // This use to validate the resquest authentication and authorization
    const session = await serverSession();
    //console.log("Session===", session);
     if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session?.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response data
const MAX_RETRIES = 3;

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Check if the request should be retried
    if (
      config &&
      ["ERR_NETWORK", "ECONNABORTED"].includes(error.code) &&
      !config._retry
    ) {
      config._retry = true; // Mark the request as retried
      config._retries = (config._retries || 0) + 1;

      if (config._retries <= MAX_RETRIES) {
        console.warn(`Retrying request... Attempt ${config._retries}`);
        return instance(config);
      }
    }

    return Promise.reject(error);
  }
);
/* instance.interceptors.response.use((response) => {
  // This use to handle the response error like 4xx
  return response?.data;
},(error) => {
  return Promise.reject(error);
}); */

// Create Function to handle requests from the backend
const apiInstance = async (shortUrl: string, data = {}, method: string) => {
  const options = {
    url: shortUrl,
    method: method,
    ...data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  }; 


  try {
    const response = await instance(options);
    //console.log("API===", options, response);
    return response;
  } catch (error) {
    if (error?.code === "ERR_CONNECTION_REFUSED") {
      console.error("Request timed out.");
      return error?.response;
    } else if (error?.code === "ECONNABORTED") {
      console.error("Request timed out.");
      return error?.response;
    } else if (!error?.response) {
      console.error("Network Error: Unable to reach the server.");
      return error?.response;
    } else {
      console.error("Error:", error?.response);
      return error?.response;
    }
  }
};
export const get = async (url: string, data: any) => {
  return await apiInstance(url, { ...data }, "GET");
};

export const post = async (url: string, data: any) => {
  return await apiInstance(url, { data }, "POST");
};

export const put = async (url: string, data: any) => {
  return await apiInstance(url, { data }, "PUT");
};

export const remove = async (url: string, data: any) => {
  return await apiInstance(url, { data }, "DELETE");
};
