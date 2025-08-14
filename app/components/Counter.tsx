'use client';

import { useState } from 'react';

type CounterProps = {
    users: [];
};

export default function Counter({ users }: CounterProps) {
    const [count, setCount] = useState(0);

    const handleCount = () => setCount((prevState) => prevState + 1);

    return (
        <div>
            <p>Thera are {users.length} users</p>
            <button onClick={handleCount}>{count}</button>
        </div>
    );
}
