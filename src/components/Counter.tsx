'use client';

import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);

    const handleCount = () => setCount((prevState) => prevState + 1);

    return (
        <div>
            <button onClick={handleCount}>{count}</button>
        </div>
    );
}
