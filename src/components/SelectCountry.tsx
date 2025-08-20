import { getAllCountries } from '@/src/lib/dataService/contry.service';

type SelectCountryProps = {
    id: string;
    name: string;
    className: string;
    defaultCountry: string;
};

export default async function SelectCountry({
    id,
    name,
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
            name={name}
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
