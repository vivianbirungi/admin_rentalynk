import axios from "axios";
import constants from "./constants";
const instance = axios.create({
    baseURL: constants.Base_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: false
  });
  
  // instance.interceptors.request.use((req) => {
  //   const token = localStorage.getItem("user:key");
  //   if (token) {
  //     req.headers.Authorization = `Bearer ${token}`;
  //     return req;
  //   }
  //   return req;
  // });

  
  export default instance;

 
