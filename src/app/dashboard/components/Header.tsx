import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import './Header.css';
import {
    IoMdPerson,
} from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../../../redux/hooks";
import { logout } from "../../../../redux/slices/authSlice";
import LogoutModal from "./Logout";

// Function to decode the JWT without external libraries
const decodeJWT = (token: string) => {
    try {
        const base64Url = token.split(".")[1]; // Get the payload part
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Fix for URL-safe base64
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Failed to decode token", error);
        return null;
    }
};

const Header = () => {
    const dispatch = useAppDispatch();
    const [userName, setUserName] = useState("Getaprime User");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action
        router.replace("/login");
    };

    const handleLogoClick = () => {
        router.push(`/dashboard`);
    };

    useEffect(() => {
        // Ensure this runs only on the client side
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const decodedToken: any | null = decodeJWT(token);
                if (decodedToken) {
                    setUserName(decodedToken.name || "Getaprime User");
                }
            }
        }
    }, [])

    return (
        <header className="flex items-center justify-between w-full bg-gray-100 border-0 px-4 transition-margin duration-300 min-h-[70px]">
            <div
                className="relative h-16 w-28 cursor-pointer"
                onClick={handleLogoClick}
            >
                <Image
                    src="/next.svg"
                    alt="Logo"
                    layout="fill"
                    objectFit="contain"
                    priority
                />
            </div>

            {/* Notification and User Profile */}
            <div className="flex items-center space-x-4">

                {/* Vertical Separator */}
                <div className="border-l border-gray-300 h-5"></div>

                {/* User Profile */}
                <div className="relative" ref={dropdownRef}>
                    <div
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 py-2 px-1 rounded-lg"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <IoMdPerson className="text-2xl text-white bg-purple-500 rounded-full p-1" />
                        <span className="hidden lg:block text-xs text-gray-700">
                            <p className="font-bold">{userName}</p>
                        </span>
                    </div>

                </div>
            </div>
            {isModalOpen && (
                <LogoutModal handleLogout={handleLogout} setIsModalOpen={setIsModalOpen} />
            )}
        </header>
    );
};

export default Header;