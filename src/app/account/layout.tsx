'use client';

import {
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon,
} from '@heroicons/react/24/solid';

import { useEffect, useState } from 'react';
import { type LayoutProps } from '../layout';
import SideNavigation from '@/src/components/sideNavigation/SideNavigation';

export default function Layout({ children }: LayoutProps) {
    const [screenWidth, setScreenWidth] = useState(801);
    const [isSideNavVisible, setIsSideNavVisible] = useState(true);

    const isSmallScreen = screenWidth < 801;

    const handleSideNavVisibility = () => {
        isSmallScreen
            ? setIsSideNavVisible((prevState) => !prevState)
            : setIsSideNavVisible(true);
    };

    const handleScreenWidth = () => setScreenWidth(window.innerWidth);

    useEffect(() => {
        window.addEventListener('load', handleScreenWidth);
        window.addEventListener('resize', handleScreenWidth);

        isSmallScreen ? setIsSideNavVisible(false) : setIsSideNavVisible(true);

        return () => {
            window.removeEventListener('load', handleScreenWidth);
            window.removeEventListener('resize', handleScreenWidth);
        };
    }, [screenWidth]);

    return (
        <div className="relative grid h-full gap-12 min-[801px]:grid-cols-[16rem_1fr]">
            <button
                onClick={handleSideNavVisibility}
                className="absolute -top-8 min-[801px]:hidden"
            >
                {isSideNavVisible ? (
                    <ChevronDoubleLeftIcon className="h-5 w-5 text-primary-600" />
                ) : (
                    <ChevronDoubleRightIcon className="h-5 w-5 text-primary-600" />
                )}
            </button>
            <SideNavigation
                isVisible={isSideNavVisible}
                onHide={handleSideNavVisibility}
            />
            <div className="py-1">{children}</div>
        </div>
    );
}
