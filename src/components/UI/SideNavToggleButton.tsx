import {
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon,
} from '@heroicons/react/24/solid';

import { type SideNavProps } from '../sideNavigation/SideNavigation';

export default function SideNavToggleButton({
    onToggle,
    isVisible,
}: SideNavProps) {
    return (
        <button
            onClick={onToggle}
            className="absolute -top-8 min-[801px]:hidden"
        >
            {isVisible ? (
                <ChevronDoubleLeftIcon className="h-5 w-5 text-primary-600" />
            ) : (
                <ChevronDoubleRightIcon className="h-5 w-5 text-primary-600" />
            )}
        </button>
    );
}
