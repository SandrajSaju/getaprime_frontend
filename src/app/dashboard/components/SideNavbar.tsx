// components/SideNav.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    TbLayoutSidebarLeftCollapseFilled,
    TbLayoutSidebarLeftExpandFilled,
} from "react-icons/tb";

import {
    AiOutlineDashboard,
    AiOutlineLogout,
    AiOutlineSetting,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { logout } from "../../../../redux/slices/authSlice";
import { MdOutlineReport } from "react-icons/md";
import { BiWallet } from "react-icons/bi";
import { expandSideBar, selectIsSidebarExpanded } from "../../../../redux/slices/sidebarSlice";
import LogoutModal from "./Logout";

const SideNavBar: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isSidebarExpanded = useAppSelector(selectIsSidebarExpanded);

    const toggleSidebar = () => {
        const newState = !isSidebarExpanded;
        dispatch(expandSideBar(newState));
        localStorage.setItem("isSidebarExpanded", newState.toString());
    };

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action
        router.push("/login");
    };

    const pathname = usePathname();
    const isActive = (path: string): boolean => pathname === path;

    const activeStyle = "bg-purple-100 text-purple-600 border-r-4 border-purple-600";

    const generalMenus = [
        {
            key: "dashboard",
            name: "Dashboard",
            link: "/dashboard",
            icon: <AiOutlineDashboard className="mr-3 text-lg" />,
        },
        {
            key: "features",
            name: "Features",
            link: "/dashboard/features",
            icon: <MdOutlineReport className="mr-3 text-lg" />,
        },
        {
            key: "subscription",
            name: "Subscription",
            link: "/dashboard/pricing",
            icon: <BiWallet className="mr-3 text-lg" />,
        },
        {
            key: "settings",
            name: "Settings",
            link: "/dashboard/settings",
            icon: <AiOutlineSetting className="mr-3 text-lg" />,
        },
    ];

    return (
        <div className="flex flex-col h-full bg-white transition-width duration-300 ease-in-out w-full">
            <div
                className={`flex items-center px-4 py-2 mr-3 ${isSidebarExpanded ? "justify-end" : "justify-center"
                    }`}
            >
                <button
                    onClick={toggleSidebar}
                    className="text-xl rounded-full p-1 hover:bg-gray-200"
                >
                    {isSidebarExpanded ? (
                        <TbLayoutSidebarLeftCollapseFilled className="text-gray-700" />
                    ) : (
                        <TbLayoutSidebarLeftExpandFilled className="text-gray-700" />
                    )}
                </button>
            </div>
            <>
                <div className="flex-1 overflow-y-auto min-h-0 px-2">
                    <div>
                        <ul className="space-y-2.5">
                            {generalMenus.map((menu: any) => (
                                <li
                                    key={menu.key}
                                    className="transition-transform duration-300 ease-in-out transform hover:bg-gray-100 rounded-md"
                                >
                                    <Link
                                        href={menu.link}
                                        className={`flex items-center  text-gray-700 hover:text-purple-600 py-2.5 px-4 rounded-md ${pathname.startsWith(menu.link) &&
                                            menu.link !== "/dashboard"
                                            ? activeStyle
                                            : ""
                                            } ${pathname === "/dashboard" &&
                                                menu.link === "/dashboard"
                                                ? activeStyle
                                                : ""
                                            } ${isSidebarExpanded
                                                ? "justify-start flex-row"
                                                : "justify-center"
                                            }`}
                                    >
                                        {menu.icon}
                                        {isSidebarExpanded && (
                                            <span className="ml-2">{menu.name}</span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-5 mb-5">
                        <div className="mt-3">
                            <ul>
                                <li className="hover:bg-gray-100 rounded-md">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="flex items-center text-gray-700 hover:text-purple-600 py-2.5 px-4 rounded-md"
                                    >
                                        <AiOutlineLogout className="mr-3 text-lg" />
                                        {isSidebarExpanded && (
                                            <span className="ml-2">Logout</span>
                                        )}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>

            {isModalOpen && (
                <LogoutModal handleLogout={handleLogout} setIsModalOpen={setIsModalOpen} />
            )}
        </div>
    );
};

export default SideNavBar;