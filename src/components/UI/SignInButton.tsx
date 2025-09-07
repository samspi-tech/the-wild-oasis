import { signInAction } from '@/src/lib/actions';

export default function SignInButton() {
    return (
        <form action={signInAction}>
            <button className="flex items-center gap-6 border border-primary-300 px-10 py-4 text-lg font-medium">
                <img
                    width="24"
                    height="24"
                    alt="Google logo"
                    src="https://authjs.dev/img/providers/google.svg"
                />
                <span>Continue with Google</span>
            </button>
        </form>
    );
}
