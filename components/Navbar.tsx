import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

export default function Navbar() {
    return (
        <nav className='flex justify-between items-center border-b border-gray-200'>
            <Link href="/" className='flex items-center gap-2'>
                <Image src={"/deal-drop-logo.png"} alt='Logo' width={100} height={100} />
            </Link>

            {/* Auth button */}
            <Button size={"sm"} className=''>

            </Button>
        </nav>
    )
}
