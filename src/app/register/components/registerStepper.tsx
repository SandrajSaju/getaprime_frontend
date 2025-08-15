import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faChevronRight,
    faChevronLeft,
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
interface StrengthData {
    teamSize: string;
    companySize: string;
}

interface Step1Props {
    formData: FormData;
    password: string;
    confirmPassword: string;
    selectedCountryCode: string;
    showPassword: boolean;
    showConfirmPassword: boolean;
    errors: any;
    updateShowPassword: () => void;
    updateShowConfirmPassword: () => void;
    updatePassword: (field: string, value: string) => void;
    updateFormData: (field: keyof FormData, value: string) => void;
    updateConfirmPassword: (value: string) => void;
    handleSelectChange: (
        selectedOption: { value: string | number; label: string } | null,
        name: string
    ) => void;
    sendOtp: any;
    verifyOtp: any;
    isEmailVerified: boolean;
    isModalOpen: boolean;
    setIsModalOpen: (flag: boolean) => void;
    sendOtpLoading: boolean;
    verifyOtpLoading: boolean;
    otpError: string;
    setOtpError: (error: string) => void;
}

export default function Stepper() {
    const [errors, setErrors] = useState({});
    const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
    const [chooseTypeOfBusiness, setChooseTypeOfBusiness] = useState("");
    const [strengthData, setStrengthData] = useState<StrengthData>({
        teamSize: "",
        companySize: "",
    });
    const [organization, setOrganization] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [sendOtpLoading, setSendOtpLoading] = useState(false);
    const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formData, setFormData] = useState<FormData>({
        userName: "",
        email: "",
        phoneNumber: "",
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<
        "success" | "error" | "info" | "warning"
    >("success");
    const [showToast, setShowToast] = useState(false);
    const [otpError, setOtpError] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSelectChange = (
        selectedOption: { value: string | number; label: string } | null,
        name: string
    ) => {
        setFormData({
            ...formData,
            [name]: selectedOption ? selectedOption.value : "",
        });
    };

    const sendOtp = async () => {
        try {
            setSendOtpLoading(true);
            // Call the backend API to send OTP
            await AXIOS.post("/auth/send-otp", { email: formData.email });
            setIsModalOpen(true);
            setErrors({})
        } catch (error: any) {
            let errors: any = {}
            // Capture the error message from the backend and store it in a variable
            if (error.response && error.response.data && error.response.data.error) {
                errors.email = error.response.data.error
                setErrors(errors)
            } else {
                errors.email = "An unknown error occurred"
                setErrors(errors)
            }
            console.error("Failed to send OTP", errors);
        } finally {
            setSendOtpLoading(false);
        }
    };

    const verifyOtp = async (otp: string) => {
        try {
            setVerifyOtpLoading(true);
            const response = await AXIOS.post("/auth/verify-otp", {
                email: formData.email,
                otp,
            });
            if (response.data.success) {
                setToastMessage("OTP Verified Successfully.");
                setToastType("success");
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
                setIsEmailVerified(true);
                setIsModalOpen(false);
            } else {
                setToastMessage(response.data.error);
                setToastType("error");
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
                setOtpError("Invalid OTP. Please try again.");
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                setOtpError(error.response.data.error)
            } else {
                setOtpError('An unknown error occured')
            }
        } finally {
            setVerifyOtpLoading(false);
        }
    };

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();

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
                    ...strengthData,
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
        switch (currentStep) {
            case 1:
                const step1Errors = {
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                };

                if (!formData.userName) {
                    step1Errors.userName = "Name is required";
                    valid = false;
                }

                if (!formData.email) {
                    step1Errors.email = "Email is required";
                    valid = false;
                }

                if (formData.email) {
                    if (!emailRegex.test(formData.email)) {
                        step1Errors.email = "Please enter valid email";
                        valid = false;
                    }
                }

                if (formData.email && emailRegex.test(formData.email) && !isEmailVerified) {
                    step1Errors.email = "Please verify your email";
                    valid = false
                }

                if (!password) {
                    step1Errors.password = "Password is required";
                    valid = false;
                }

                if (!confirmPassword) {
                    step1Errors.confirmPassword = "Please Confirm password";
                    valid = false;
                }

                if (confirmPassword && confirmPassword !== password) {
                    step1Errors.confirmPassword = "Password doesn't match";
                    valid = false;
                }
                setErrors(step1Errors);
                break;
        }

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

    const updateStrengthData = (field: keyof StrengthData, value: string) => {
        setStrengthData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const steps = [
        {
            id: 1,
            label: "Step 1",
            content: (
                <Step1
                    formData={formData}
                    updateFormData={updateFormData}
                    password={password}
                    confirmPassword={confirmPassword}
                    updatePassword={updatePassword}
                    updateShowPassword={updateShowPassword}
                    updateShowConfirmPassword={updateShowConfirmPassword}
                    showPassword={showPassword}
                    updateConfirmPassword={updateConfirmPassword}
                    selectedCountryCode={selectedCountryCode}
                    handleSelectChange={handleSelectChange}
                    errors={errors}
                    sendOtp={sendOtp}
                    verifyOtp={verifyOtp}
                    showConfirmPassword={showConfirmPassword}
                    isEmailVerified={isEmailVerified}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    sendOtpLoading={sendOtpLoading}
                    verifyOtpLoading={verifyOtpLoading}
                    otpError={otpError}
                    setOtpError={setOtpError}
                />
            ),
        },
    ];

    const nextStep = () => {
        if (validateForm()) {
            if (currentStep < steps.length) {
                setDirection(1);
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setDirection(-1);
            setCurrentStep(currentStep - 1);
        }
    };
    const handleToastClose = () => {
        setShowToast(false);
    };

    const handleLoginClick = () => {
        router.push("/login");
    };


    return (
        <>
            <div className="flex flex-col h-[70vh] w-full max-w-[88%] mx-auto">
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
                {/* Stepper Content with Animation */}
                <div className="relative flex-grow mb-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: direction === 1 ? 100 : -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction === 1 ? -100 : 100 }}
                            transition={{ duration: 0.5 }}
                            className="absolute w-full"
                        >
                            {steps.find((step) => step.id === currentStep)?.content}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-auto p-4 bg-white">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="text-purple-600 py-2 px-4 rounded disabled:text-gray-300 flex justify-center gap-2 items-center"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                        Previous
                    </button>

                    {currentStep === steps.length ? (
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
                    ) : (
                        <button
                            onClick={nextStep}
                            disabled={currentStep === steps.length}
                            className="text-purple-600 py-2 px-4 rounded disabled:text-gray-300 flex justify-center gap-2 items-center"
                        >
                            Next
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    )}
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

// Step Components
function Step1({
    formData,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    updateFormData,
    updateConfirmPassword,
    updatePassword,
    updateShowPassword,
    updateShowConfirmPassword,
    errors,
    sendOtp,
    verifyOtp,
    isEmailVerified,
    isModalOpen,
    setIsModalOpen,
    sendOtpLoading,
    verifyOtpLoading,
    setOtpError,
    otpError
}: Step1Props) {

    const handleSendOtp = async () => {
        const email = formData.email;
        if (email) {
            const result = await sendOtp(); // Assuming `sendOtp` sends the OTP to the backend
            // setIsModalOpen(true);
        }
    };

    const handleVerifyOtp = async (otp: string) => {
        await verifyOtp(otp); // Pass OTP to verify function
    };

    return (
        <div className="flex flex-col">
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
    );
}