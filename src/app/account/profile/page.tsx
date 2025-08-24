import SelectCountry from '@/src/components/UI/SelectCountry';
import UpdateProfileForm from '@/src/components/UpdateProfileForm';

export const metadata = {
    title: 'Update profile',
};

export default function Page() {
    const nationality = 'portugal';

    return (
        <section>
            <h2 className="mb-4 text-2xl font-semibold text-accent-400">
                Update your guest profile
            </h2>
            <p className="mb-8 text-lg text-primary-200">
                Providing the following information will make your check-in
                process faster and smoother. See you soon!
            </p>
            <UpdateProfileForm>
                <SelectCountry
                    id="nationality"
                    name="nationality"
                    defaultCountry={nationality}
                    className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
                />
            </UpdateProfileForm>
        </section>
    );
}
