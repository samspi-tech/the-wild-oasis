import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
    text: string;
};

export default function SubmitButton({ text }: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <div className="flex items-center justify-end gap-6">
            <button
                type="submit"
                disabled={pending}
                className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
            >
                {pending ? 'Updating...' : text}
            </button>
        </div>
    );
}
