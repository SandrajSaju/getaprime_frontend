"use client";
import { usePathname } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Header from "./components/Header";
import SideNavBar from "./components/SideNavbar";
import { useAppSelector } from "../../../redux/hooks";
import { selectIsSidebarExpanded } from "../../../redux/slices/sidebarSlice";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const isSidebarExpanded = useAppSelector(selectIsSidebarExpanded);
    const [isTrialExpired, setIsTrialExpired] = useState<boolean | null>(null);

    useEffect(() => {
        console.log("isSidebarExpanded", isSidebarExpanded);
    }, [isSidebarExpanded]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsTrialExpired(localStorage.getItem("isTrialExpired") === "true");
        }
    }, []);

    return (
        <>
            {/* Full height flex column: Header fixed at top, rest is scrollable */}
            <div className="flex flex-col h-screen bg-gray-100 pr-2">
                {/* Header stays visible always */}
                <div className="flex-shrink-0">
                    <Header />
                </div>

                {/* Main content: sidebar + page content */}
                <div className="flex flex-1 bg-gray-100 min-h-0">
                    {/* Sidebar (non-scrolling except its own content) */}
                    <div
                        className={`flex ${isSidebarExpanded ? "w-52" : "w-20"
                            } transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden border-r border-gray-200 rounded-[20px]`}
                    >
                        <SideNavBar />
                    </div>

                    {/* Page content scrollable */}
                    <div
                        className={`
                            flex-1 overflow-y-auto p-0 bg-white rounded-[20px]
                            ${isSidebarExpanded ? "ml-1" : "ml-1"}
                                transition-all duration-300 ease-in-out
                            `}
                    >
                        <div className={`${isTrialExpired ? "blur-sm" : ""}`}>
                            {children}
                        </div>
                        {/* {isTrialExpired && <TrialExpiredOverlay />} */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;