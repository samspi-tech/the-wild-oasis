'use client';

import { type LayoutProps } from '../layout';
import { useSideNavToggle } from '@/src/hooks/useSideNavToggle';
import SideNavToggleButton from '@/src/components/UI/SideNavToggleButton';
import SideNavigation from '@/src/components/sideNavigation/SideNavigation';

export default function Layout({ children }: LayoutProps) {
    const { isSideNavVisible, handleSideNavVisibility } = useSideNavToggle();

    return (
        <div className="relative grid h-full gap-12 min-[801px]:grid-cols-[16rem_1fr]">
            <SideNavToggleButton
                isVisible={isSideNavVisible}
                onToggle={handleSideNavVisibility}
            />
            <SideNavigation
                isVisible={isSideNavVisible}
                onToggle={handleSideNavVisibility}
            />
            <div className="py-1">{children}</div>
        </div>
    );
}
