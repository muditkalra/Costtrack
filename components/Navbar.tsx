import Image from 'next/image'
import Link from 'next/link'
import AuthButton from './AuthButton'
import { createClient } from '@/lib/supabase/server'

export default async function Navbar() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className='flex justify-between items-center border-b py-3 px-1'>
            <Link href="/" className='flex items-center gap-2'>
                <Image src={"/deal-drop-logo.png"} alt='Logo' width={100} height={100} />
            </Link>

            <AuthButton user={user} />
        </nav>
    )
}
