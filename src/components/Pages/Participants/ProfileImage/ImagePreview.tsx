import React from 'react'
import Image from "next/image"

const ImagePreview = ({link,show,setShow}:{link:string,show:boolean,setShow:()=>void}) => {
  return !show ? null : (
    <div className='flex flex-col items-center justify-center h-screen absolute w-full bg-black/50 top-0 left-0 z-50 backdrop-blur-xl' onClick={setShow}>
        <Image src={link} alt='' width={1024} height={1024} className={`bg-red-200 rounded-full h-3/4 aspect-auto object-contain z-20 hover:brightness-110 `} onClick={(e)=>e.stopPropagation()} />
    </div>
  )
}

export default ImagePreview