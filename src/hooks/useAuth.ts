// src/hooks/useAuth.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function useAuth({ redirectIfLoggedIn = false } = {}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken") || Cookies.get("accessToken");
    const refreshToken = localStorage.getItem("refreshToken") || Cookies.get("refreshToken");

    if (token && refreshToken) {
      setIsLoggedIn(true);
      if (redirectIfLoggedIn) {
        // If user is logged in but on login/register page → redirect to dashboard
        router.replace("/dashboard");
      }
    } else {
      setIsLoggedIn(false);
      if (!redirectIfLoggedIn) {
        // If user is not logged in but trying to access dashboard will redirect to login
        router.replace("/login");
      }
    }
    setLoading(false);
  }, [router, redirectIfLoggedIn]);

  return { isLoggedIn, checkingForLoginState: loading };
}