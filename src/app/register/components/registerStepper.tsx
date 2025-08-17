import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import ToastMessage from "@/app/components/ToastMessage";
import AXIOS from "@/app/axios-setup/axiosInstance";
import { useAppDispatch } from "../../../../redux/hooks";
import { signUpUser } from "../../../../redux/slices/authSlice";

interface FormData {
    userName: string;
    email: string;
    phoneNumber: string;
}

export default function SignUp() {
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formData, setFormData] = useState<FormData>({
        userName: "",
        email: "",
        phoneNumber: "",
    });
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<
        "success" | "error" | "info" | "warning"
    >("success");
    const [showToast, setShowToast] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();
        if(!validateForm()){
            return;
        }

        if (password !== confirmPassword) {
            setToastMessage("Passwords do not match.");
            setToastType("error");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return;
        }

        setLoading(true);

        try {
            const resultAction = await dispatch(
                signUpUser({
                    ...formData,
                    password,
                    username: formData.userName,
                })
            );

            if (signUpUser.fulfilled.match(resultAction)) {
                setToastMessage("Signup Successful.");
                setToastType("success");
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                    router.push("/login");
                }, 3000);
            } else {
                setToastMessage(resultAction.payload as string);
                setToastType("error");
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
            }
        } catch (error) {
            setToastMessage("An unexpected error occurred.");
            setToastType("error");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        let valid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errors = {
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
        };

        if (!formData.userName) {
            errors.userName = "Name is required";
            valid = false;
        }

        if (!formData.email) {
            errors.email = "Email is required";
            valid = false;
        }

        if (formData.email) {
            if (!emailRegex.test(formData.email)) {
                errors.email = "Please enter valid email";
                valid = false;
            }
        }

        if (!password) {
            errors.password = "Password is required";
            valid = false;
        }

        if (!confirmPassword) {
            errors.confirmPassword = "Please Confirm password";
            valid = false;
        }

        if (confirmPassword && confirmPassword !== password) {
            errors.confirmPassword = "Password doesn't match";
            valid = false;
        }
        setErrors(errors);
        return valid;
    };

    // Function to update formData
    const updateFormData = (field: keyof FormData, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const updatePassword = (field: string, value: string) => {
        if (field === "password") setPassword(value);
        else setConfirmPassword(value);
    };

    const updateShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const updateShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const updateConfirmPassword = (value: string) => {
        setConfirmPassword(value);
    };

    const handleToastClose = () => {
        setShowToast(false);
    };

    const handleLoginClick = () => {
        router.push("/login");
    };

    return (
        <>
            <div className="flex flex-col h-[70vh] w-full max-w-[88%] mx-auto items-center justify-center">
                {showToast && (
                    <div className="fixed top-0 right-0 m-4 z-100">
                        <ToastMessage
                            type={toastType}
                            title={toastType === "success" ? "Success" : "Error"}
                            message={toastMessage}
                            onClose={handleToastClose}
                        />
                    </div>
                )}
                <div className="flex flex-col w-full">
                    <p className="text-2xl text-gray-500 text-center">Sign Up</p>
                    <div className={`${errors["userName"] ? 'mb-0' : 'mb-4'}`}>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Your Name
                        </label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={(e) => updateFormData("userName", e.target.value)}
                            className="border p-2 rounded-lg w-full text-sm border-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500"
                            placeholder="Enter your name"
                        />
                        {errors["userName"] && (
                            <span className="text-red-500 text-xs">{errors["userName"]}</span>
                        )}
                    </div>

                    <div className={`${errors["email"] ? 'mb-0' : 'mb-4'} relative`}>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <div className="flex">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => updateFormData("email", e.target.value)}
                                className="border p-2 rounded-lg w-full text-sm border-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors["email"] && (
                            <span className="text-red-500 text-xs">{errors["email"]}</span>
                        )}
                    </div>

                    <div className={`${errors["password"] ? 'mb-0' : 'mb-4'} relative`}>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={(e) => updatePassword("password", e.target.value)}
                            className="border p-2 rounded-lg w-full text-sm border-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => updateShowPassword()}
                            className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ${errors["password"] ? 'top-0' : 'top-6'}`}
                        >
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="text-gray-400"
                            />
                        </button>
                        {errors["password"] && (
                            <span className="text-red-500 text-xs">
                                {errors["password"]}
                            </span>
                        )}
                    </div>
                    <div className={`${errors["confirmassword"] ? 'mb-0' : 'mb-4'} relative`}>
                        <label
                            htmlFor="confirm_password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Confirm password
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirm_password"
                            value={confirmPassword}
                            onChange={(e) => updateConfirmPassword(e.target.value)}
                            className="border p-2 rounded-lg w-full text-sm border-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => updateShowConfirmPassword()}
                            className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ${errors["confirmPassword"] ? 'top-0' : 'top-6'}`}
                        >
                            <FontAwesomeIcon
                                icon={showConfirmPassword ? faEyeSlash : faEye}
                                className="text-gray-400"
                            />
                        </button>
                        {errors["confirmPassword"] && (
                            <span className="text-red-500 text-xs">
                                {errors["confirmPassword"]}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex w-full justify-center flex-col items-end">
                    <button
                        type="button"
                        onClick={handleSignup}
                        className="w-1/2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-lg flex justify-center items-center"
                    >
                        <span>Sign Up</span>
                        {loading && (
                            <ClipLoader color="#ffffff" size={24} className="ml-2" />
                        )}
                    </button>
                </div>
            </div>
            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Already have an account?
                    <button
                        onClick={handleLoginClick}
                        className="font-medium text-purple-600 hover:text-purple-500 transition duration-150 ease-in-out ml-1 cursor-pointer"
                    >
                        Login
                    </button>
                </p>
            </div>
        </>
    );
}