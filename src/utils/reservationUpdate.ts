export function getBookingUpdateData(formData: FormData) {
    const numGuests = Number(formData.get('numGuests'));
    const observations = <string>formData.get('observations')?.slice(0, 1000);

    return { numGuests, observations };
}
