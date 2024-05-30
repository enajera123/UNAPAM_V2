import { Header } from '@/components/NavBar/Header';
import logoUNAPAM from '@/resources/LogoWhite.png';
import Image from 'next/image';

export default function InformationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <footer className="bg-gray-gradient py-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2">
                            <p className="font-bold mb-15 text-center md:text-left text-2xl text-medium-red">
                                UNA PAM PÉREZ ZELEDÓN:
                            </p>
                            <p className="font-light mb-15 text-center md:text-left text-lg text-white">
                                Potenciando habilidades desde la educación para un envejecimiento saludable.
                            </p>
                        </div>
                        <div className="md:w-1/2 flex justify-center md:justify-end mt-9 md:mt-0">
                            <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-60 h-auto" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}