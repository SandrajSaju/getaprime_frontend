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
          const accessToken = res.data.tokens.accessToken;
          // Split the token into parts
          const base64Url = accessToken.split(".")[1];
          // Decode the base64Url encoded payload
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );

          const accessTokenPayload = JSON.parse(jsonPayload);
          localStorage.setItem(
            "isTrialExpired",
            accessTokenPayload.isTrialExpired
          );
          return AXIOS(originalRequest);
        }
      });
    } else if (error.response.status === 403) {
        
    }
    return Promise.reject(error);
  }
);

export default AXIOS;