import { useContext } from 'react';
import { ReservationContext } from '@/src/contexts/ReservationContext';

export function useReservationContenxt() {
    const reservationContext = useContext(ReservationContext);

    if (!reservationContext) throw new Error('ReservationContext is null');

    return reservationContext;
}
