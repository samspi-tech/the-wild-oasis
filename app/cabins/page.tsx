import Counter from '../components/Counter';

type User = {
    id: string;
    name: string;
};

export default async function Page() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    return (
        <div>
            <h1>Cabins page</h1>
            <ul>
                {users.map((user: User) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            <Counter users={users} />
        </div>
    );
}
