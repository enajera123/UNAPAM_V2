import Carrousel from '@/components/Carrousel/Carrousel'
import Image from 'next/image'
import React from 'react'
import icon from "@/resources/LogoWhite.webp"
function Information() {
    return (
        <div >
            <div>
                <Carrousel />
            </div>
            <div className="flex my-32 flex-col items-center">

                <div className="max-w-xl">
                    <div className="bg-medium-red rounded-full w-20 h-20 flex justify-center items-center my-3 mx-auto">
                        <Image alt="" src={icon} width={50} height={50} />
                    </div>
                    <h1 className="text-lg font-extrabold mb-3 text-center">Objetivo</h1>
                    <p className='font-italic text-center'>
                        Promover el envejecimiento saludable mediante la facilitación de espacios
                        educativos, que contribuyan al mantenimiento y adquisición de habilidades
                        para la vida de las personas adultas mayores en el cantón de Pérez
                        Zeledón, así como, a la construcción de una sociedad más equitativa y
                        solidaria</p>
                </div>
            </div>
        </div>
    )
}

export default Information