import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import './Header.css';
import {
    IoMdArrowDropdown,
    IoMdArrowDropup,
    IoMdPerson,
} from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../../../redux/hooks";
import { logout } from "../../../../redux/slices/authSlice";
import { AvatarIcon, HelpIcon, LogoutIcon, SettingsIcon } from "@/app/components/icons";
import LogoutModal from "./Logout";

const Header = () => {
    const dispatch = useAppDispatch();
    const searchModalRef = useRef<HTMLDivElement>(null);
    const [userName, setUserName] = useState("");
    const [userRole, setUserRole] = useState("");
    const [image, setImage] = useState("");
    const [userOrganisation, setUserOrganisation] = useState("Luqa");
    const [userId, setUserId] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchModalOpen, setSearchModalOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action
        router.replace("/login");
    };

    const handlePrivacyClick = () => {

    }

    // Close modal when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchModalRef.current && !searchModalRef.current.contains(event.target as Node)) {
                setSearchModalOpen(false);
            }
        }

        if (searchModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchModalOpen]);

    const handleUserProfileClick = () => {
        if (userId) {
            setDropdownOpen(false);
            router.push(`/dashboard/settings`);
        }
    };

    const handleLogoClick = () => {
        router.push(`/dashboard`);
    };


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
                            <p className="font-bold">{userOrganisation}</p>
                        </span>
                        {dropdownOpen ? (
                            <IoMdArrowDropup className="text-xl text-gray-700" />
                        ) : (
                            <IoMdArrowDropdown className="text-xl text-gray-700" />
                        )}
                    </div>
                    {/* Dropdown */}
                    {dropdownOpen && (
                        <div className="profile-dropdown">
                            <div className="top-section">
                                {image ?
                                    <img className="pp" src={image} /> :
                                    <div className="pp-default">{userName[0]}</div>
                                }
                                <div className="userdetails-wrapper">
                                    <p className="username">{userName}</p>
                                    <p className="user-role">{userRole}</p>
                                </div>
                            </div>
                            <div className="middle-section">
                                <div
                                    className="option-container"
                                    onClick={handleUserProfileClick}>
                                    <AvatarIcon />
                                    <p>Profile</p>
                                </div>
                                <div
                                    className="option-container"
                                    onClick={() => router.push(`/dashboard/settings`)}>
                                    <SettingsIcon />
                                    <p>Settings</p>
                                </div>
                                <div
                                    className="option-container"
                                    onClick={() => router.push(`/dashboard/help`)}>
                                    <HelpIcon />
                                    <p>Help</p>
                                </div>
                                <div
                                    className="option-container logout-button"
                                    onClick={() => setIsModalOpen(true)}>
                                    <LogoutIcon />
                                    <p>Logout</p>
                                </div>
                            </div>
                            <ul className="bottom-section">
                                <li onClick={handlePrivacyClick}>
                                    Privacy Policy</li>
                                <li>&#183;</li>
                                <li onClick={() => router.push(`/policies`)}>
                                    Terms & Conditions</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {isModalOpen && (
                <LogoutModal handleLogout={handleLogout} setIsModalOpen={setIsModalOpen} />
            )}
        </header>
    );
};

export default Header;