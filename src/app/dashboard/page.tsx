"use client";

import { useEffect } from "react";
import AXIOS from "../axios-setup/axiosInstance";
import useAuth from "@/hooks/useAuth";
import Loader from "../components/Loader";

export default function DashboardPage() {
    const { isLoggedIn, checkingForLoginState } = useAuth(); // default: redirect if NOT logged in

    if (checkingForLoginState) return <Loader text="Loading your dashboard..." />;

    return (
        <>
            <div className="min-h-screen flex items-center justify-evenly">
                <h1>Welcomeeee</h1>
            </div>
        </>
    );
}