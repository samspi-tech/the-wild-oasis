type CabinFilterButtonProps = {
    name: string;
    filter: string;
    activeFilter: string | null;
    onFilter: (filter: string) => void;
};

export default function CabinFilterButton({
    name,
    filter,
    onFilter,
    activeFilter,
}: CabinFilterButtonProps) {
    return (
        <button
            onClick={() => onFilter(filter)}
            className={`${filter === activeFilter && 'bg-primary-700 text-primary-50'} flex-grow px-5 py-2 hover:bg-primary-700`}
        >
            {name}
        </button>
    );
}
