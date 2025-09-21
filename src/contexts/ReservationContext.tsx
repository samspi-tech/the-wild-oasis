'use client';

import {
    useState,
    createContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from 'react';
import { type DateRange } from 'react-day-picker';

export type Range = DateRange | undefined;

type ReservationContextValues = {
    range: Range;
    resetRange: () => void;
    setRange: Dispatch<SetStateAction<Range>>;
};

export const ReservationContext =
    createContext<ReservationContextValues | null>(null);

type ReservationProviderProps = {
    children: ReactNode;
};

export function ReservationProvider({ children }: ReservationProviderProps) {
    const [range, setRange] = useState<Range>();

    const resetRange = () => setRange({ from: undefined, to: undefined });

    return (
        <ReservationContext.Provider
            value={{
                range,
                setRange,
                resetRange,
            }}
        >
            {children}
        </ReservationContext.Provider>
    );
}
