import { useEffect, useState } from 'react';

export function useSideNavToggle() {
    const [screenWidth, setScreenWidth] = useState(0);
    const [isSideNavVisible, setIsSideNavVisible] = useState(true);

    const isSmallScreen = screenWidth < 801;

    const handleSideNavVisibility = () => {
        isSmallScreen
            ? setIsSideNavVisible((prevState) => !prevState)
            : setIsSideNavVisible(true);
    };

    const handleScreenWidth = () => setScreenWidth(window.innerWidth);

    useEffect(() => {
        handleScreenWidth();
        window.addEventListener('resize', handleScreenWidth);

        isSmallScreen ? setIsSideNavVisible(false) : setIsSideNavVisible(true);

        return () => window.removeEventListener('resize', handleScreenWidth);
    }, [screenWidth]);

    return {
        isSideNavVisible,
        handleSideNavVisibility,
    };
}
