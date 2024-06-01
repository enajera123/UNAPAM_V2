import Link from "next/link";
import Button from "@/components/Button/Button";
import logoUNAPAM from '@/resources/LogoColorful.webp';
import logoUNA from '@/resources/LogoUNA.webp';
import Image from 'next/image';

export const Header: React.FC = () => {
    return <header className="bg-light-gray px-5 flex sticky z-10 top-0 justify-between items-center">
        <div className="flex gap-1 items-center">
            <div className="bg-medium-gray rounded-bl-3xl rounded-br-3xl p-2">
                <Image src={logoUNA} alt="logoUNA" className="w-20" />
            </div>
            <Link href="/">
                <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-16 " />
            </Link>
        </div>
        <div className="flex gap-1 items-center">
            <Link href="/admin/information">
                <Button >Información</Button>
            </Link>
            <Link href="/admin/courses">
                <Button >Cursos</Button>
            </Link>
            <Link href="/admin/participants">
                <Button >Participantes</Button>
            </Link>
            <Link href="/admin/users">
                <Button >Usuarios</Button>
            </Link>
        </div>
    </header >
}