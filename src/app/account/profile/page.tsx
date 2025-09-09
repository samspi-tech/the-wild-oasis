import SelectCountry from '@/src/components/UI/SelectCountry';
import UpdateProfileForm from '@/src/components/updateProfileForm/UpdateProfileForm';
import { auth } from '@/src/lib/auth';
import { getGuest } from '@/src/lib/supabase/dataService/guest.service';

export const metadata = {
    title: 'Update profile',
};

export default async function Page() {
    const session = await auth();
    const email = session?.user?.email;

    const guest = await getGuest(email);

    const { nationality } = guest!;

    return (
        <section>
            <h2 className="mb-4 text-2xl font-semibold text-accent-400">
                Update your guest profile
            </h2>
            <p className="mb-8 text-lg text-primary-200">
                Providing the following information will make your check-in
                process faster and smoother. See you soon!
            </p>
            <UpdateProfileForm guest={guest}>
                <SelectCountry
                    id="nationality"
                    defaultCountry={nationality!}
                    className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
                />
            </UpdateProfileForm>
        </section>
    );
}
