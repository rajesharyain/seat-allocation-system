// src/api.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Create an Axios instance
const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend API URL
});

// Add request interceptor

/* 
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Add headers to the request config here
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken'); // Example: Adding an Authorization header

    // You can also modify other request configurations as needed
    // config.headers['Content-Type'] = 'application/json'; // Example: Adding a Content-Type header

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); */

// Add response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can handle successful responses here
    return response;
  },
  (error: AxiosError) => {
    // Handle API request errors globally
   // const errorMessage = error?.response?.data?.message || 'An error occurred during the request.';
    //return Promise.reject(errorMessage);
  }
);

export default instance;
