import Counter from '@/src/components/Counter';

export type User = {
    id: number;
    name: string;
};

export default async function Page() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await res.json();

    return (
        <div>
            <h1>Cabins page</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            <Counter users={users} />
        </div>
    );
}
