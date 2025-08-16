import axios from "axios";
const AXIOS = axios.create({
  baseURL: "http://localhost:4000/api"
});

AXIOS.interceptors.request.use(
  async (config) => {
    try {
      let token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    } catch (err) {
      return config;
    }
  },
  (error) => {
    Promise.reject(error);
  }
);

AXIOS.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      return AXIOS.post("/auth/refresh-token", { refreshToken }).then((res) => {
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.tokens.accessToken);
          localStorage.setItem("refreshToken", res.data.tokens.refreshToken);
          return AXIOS(originalRequest);
        }
      });
    } else if (error.response.status === 403) {
        window.location.href = "/access-denied";
    }
    return Promise.reject(error);
  }
);

export default AXIOS;