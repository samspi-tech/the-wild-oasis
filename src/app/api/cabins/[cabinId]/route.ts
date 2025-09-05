import { type Params } from '@/src/app/cabins/[cabinId]/page';
import { getSingleCabin } from '@/src/lib/supabase/dataService/cabin.service';
import { getBookedDatesByCabinId } from '@/src/lib/supabase/dataService/booking.service';

export async function GET(request: Request, { params }: Params) {
    const { cabinId } = params;
    const id = Number(cabinId);

    try {
        const [cabin, bookedDates] = await Promise.all([
            getSingleCabin(id),
            getBookedDatesByCabinId(id),
        ]);

        return Response.json({
            cabin,
            bookedDates,
        });
    } catch (error) {
        return Response.json({ message: 'Cabin not found.' });
    }
}
