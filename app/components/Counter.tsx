'use client';

import { useState } from 'react';
import { type User } from '../cabins/page';

type CounterProps = {
    users: User[];
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
