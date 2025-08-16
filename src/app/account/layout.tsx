import { type LayoutProps } from '../layout';
import SideNavigation from '@/src/components/sideNavigation/SideNavigation';

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="grid h-full grid-cols-[16rem_1fr] gap-12">
            <SideNavigation />
            <div className="py-1">{children}</div>
        </div>
    );
}
