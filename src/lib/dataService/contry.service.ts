type Country = {
    name: string;
    flag: string;
};

export async function getAllCountries(): Promise<Country[]> {
    try {
        const res = await fetch(
            'https://restcountries.com/v2/all?fields=name,flag',
        );
        return await res.json();
    } catch {
        throw new Error('Could not fetch countries');
    }
}
