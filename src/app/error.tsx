'use client';

type ErrorProps = {
    reset: () => void;
    error: Error & { digest?: string };
};

export default function Error({ error, reset }: ErrorProps) {
    return (
        <main className="flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-semibold">Something went wrong!</h1>
            <p className="text-lg">{error.message}</p>
            <button
                onClick={reset}
                className="inline-block bg-accent-500 px-6 py-3 text-lg text-primary-800"
            >
                Try again
            </button>
        </main>
    );
}
