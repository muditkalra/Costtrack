import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import AuthButton from './AuthButton';
import ThemeToggle from './ThemeToggle';

export default async function Navbar() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className='flex justify-between items-center border-b py-3 px-1'>
            <Link href="/" className='flex items-center gap-2'>
                <Image src={"/costtrack-logo.png"} alt='Logo' width={55} height={55} className='p-0 m-0' />
            </Link>
            <div className="flex gap-4">
                <AuthButton user={user} />
                <ThemeToggle />
            </div>
        </nav>
    )
}
