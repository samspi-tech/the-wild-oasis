import { type ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

type SubmitProps = {
    children: ReactNode;
    pendingLabel: string;
};

export default function SubmitButton({ children, pendingLabel }: SubmitProps) {
    const { pending } = useFormStatus();

    return (
        <div className="flex items-center justify-end gap-6">
            <button
                type="submit"
                disabled={pending}
                className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
            >
                {pending ? pendingLabel : children}
            </button>
        </div>
    );
}
