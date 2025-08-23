'use client';

import { useState } from 'react';

type TextExpanderProps = {
    text: string;
};

export default function TextExpander({ text }: TextExpanderProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandedText = () => setIsExpanded((prevState) => !prevState);

    const shortText = text.split(' ').slice(0, 40).join(' ') + '...';

    return (
        <span>
            {isExpanded ? text : shortText}{' '}
            <button
                onClick={handleExpandedText}
                className="border-b border-primary-700 pb-1 leading-3 text-primary-700"
            >
                {isExpanded ? 'Show less' : 'Show more'}
            </button>
        </span>
    );
}
