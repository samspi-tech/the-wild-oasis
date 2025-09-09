import { getAllCountries } from '@/src/lib/supabase/dataService/country.service';

type SelectCountryProps = {
    id: string;
    className: string;
    defaultCountry: string;
};

export default async function SelectCountry({
    id,
    className,
    defaultCountry,
}: SelectCountryProps) {
    const countries = await getAllCountries();

    const flag =
        countries.find((country) => {
            return country.name === defaultCountry;
        })?.flag ?? '';

    return (
        <select
            id={id}
            name={id}
            className={className}
            defaultValue={`${defaultCountry}%${flag}`}
        >
            <option value="">Select country...</option>
            {countries.map((country) => {
                const { name, flag } = country;

                return (
                    <option key={name} value={`${name}%${flag}`}>
                        {name}
                    </option>
                );
            })}
        </select>
    );
}
