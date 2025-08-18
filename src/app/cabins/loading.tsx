import Spinner from '@/src/components/UI/Spinner';

export default function Loading() {
    return (
        <div className="grid items-center justify-center">
            <Spinner />
            <p className="text-xl text-primary-200">Loading cabin data...</p>
        </div>
    );
}
