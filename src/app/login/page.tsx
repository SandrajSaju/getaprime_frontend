"use client";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AppDispatch, RootState } from "../../../redux/store";
import { loginUser } from "../../../redux/slices/authSlice";
import ToastMessage from "../components/ToastMessage";
import useAuth from "@/hooks/useAuth";
import Loader from "../components/Loader";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { checkingForLoginState } = useAuth({ redirectIfLoggedIn: true }); // redirect if already logged in
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    } else {
      setEmailError(""); // Clear error if valid
    }
    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError(""); // Clear error if valid
    }

    if (isValid) {
      dispatch(loginUser({ email, password }))
        .unwrap()
        .then(() => {
          setToastMessage("Login Successfull.");
          setToastType("success");
          setShowToast(true); // Show toast on successful staff creation
          setTimeout(() => {
            setShowToast(false);
              router.replace("/dashboard");
          }, 1000);
        })
        .catch((error: any) => {
          console.error("Login failed: ", error);
          const errorMessage = error;
          setToastMessage(errorMessage);
          setToastType("error");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 3000);
        });
    }
  };

  const handleToastClose = () => {
    setShowToast(false); // Close toast when user clicks on close button
  };

  const handleSignUpClick = () => {
    router.push("/register");
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  if (checkingForLoginState) return <Loader text="Checking for Login..." />;

  return (
    <>
      {showToast && (
        <div className="fixed top-0 right-0 m-4 z-50">
          <ToastMessage
            type={toastType}
            title={toastType === "success" ? "Success" : "Error"}
            message={toastMessage}
            onClose={handleToastClose}
          />
        </div>
      )}
      <div className="min-h-screen flex items-center justify-evenly">
        <div>
          <Image
            src="/Wavy_Tech-28_Single-10.jpg"
            alt="Logoin"
            objectFit="contain"
            width={600}
            height={600}
          />
        </div>

        <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <Image
              src="/next.svg"
              alt="Logo"
              width={100}
              height={100}
              objectFit="contain"
              priority
            />
            <p className="text-2xl text-gray-500">Sign in</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded-lg w-full text-sm border-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder="Enter your email"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded-lg w-full text-sm border-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ${
                  passwordError ? "top-0" : "top-6"
                }`}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="text-gray-400"
                />
              </button>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-lg flex justify-center items-center"
            >
              <span>Login</span>
              {loading && (
                <ClipLoader color="#ffffff" size={24} className="ml-2" />
              )}
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <button
                onClick={handleSignUpClick}
                className="font-medium text-purple-600 hover:text-purple-500 transition duration-150 ease-in-out ml-1 cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}