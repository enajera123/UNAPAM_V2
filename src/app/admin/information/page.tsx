import React from 'react';
import imagenFondo from '@/resources/InformationPageBackgroundImage.jpg';
import Image from 'next/image';

export default function InformationPage() {
  return (
    <div className="flex flex-col h-screen items-center">
      <div>
        <Image src={imagenFondo}  alt="Background image for information page"/>
      </div>
      <div className="max-w-xl">
        <div className="bg-medium-red rounded-full w-20 h-20 my-3 mx-auto"></div>
        <h1 className="text-lg font-extrabold mb-3 text-center">Objetivo</h1>
        <p className='font-italic'>
        Promover el envejecimiento saludable mediante la facilitación de espacios
        educativos, que contribuyan al mantenimiento y adquisición de habilidades
        para la vida de las personas adultas mayores en el cantón de Pérez
        Zeledón, así como, a la construcción de una sociedad más equitativa y
        solidaria</p>
      </div>
    </div>
  );
}
