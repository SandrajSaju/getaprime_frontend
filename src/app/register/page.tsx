"use client";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import Loader from "../components/Loader";
import SignUp from "./components/registerStepper";

export default function SignupPage() {
    const { checkingForLoginState } = useAuth({ redirectIfLoggedIn: true }); // redirect if logged in

    if (checkingForLoginState) return <Loader text="Checking for Login..." />;

    return (
        <>
            <div className="min-h-screen flex items-center justify-around">
                <div className="text-center mb-8 p-3">
                    <Image
                        src="/sign-up.jpg"
                        alt="signup"
                        width={600}
                        height={600}
                        objectFit="contain"
                        priority
                    />
                </div>
                <div className="bg-white shadow-2xl rounded-3xl w-full max-w-4xl p-8 h-[94vh] overflow-y-auto">
                    <div className="text-center mb-8">
                        <Image
                            src="/next.svg"
                            alt="Logo"
                            width={100}
                            height={100}
                            objectFit="contain"
                            priority
                        />
                    </div>
                    <SignUp />
                </div>
            </div>
        </>
    );
}