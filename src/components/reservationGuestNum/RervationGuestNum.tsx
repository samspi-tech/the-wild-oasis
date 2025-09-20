type ReservationGuestNumProps = {
    maxCapacity: number | null;
};

export default function ReservationGuestNum({
    maxCapacity,
}: ReservationGuestNumProps) {
    {
        return Array.from({ length: maxCapacity! }, (_, i) => i + 1).map(
            (x) => (
                <option value={x} key={x}>
                    {x} {x === 1 ? 'guest' : 'guests'}
                </option>
            ),
        );
    }
}
