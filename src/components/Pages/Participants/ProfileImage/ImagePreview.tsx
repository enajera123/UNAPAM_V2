import React from 'react'
import Image from "next/image"

const ImagePreview = ({link,show,setShow}:{link:string,show:boolean,setShow:()=>void}) => {

  const handleKeyDown =(e:React.KeyboardEvent<HTMLDivElement>)=>{
    if(e.key==='Escape'){
      setShow()
    }
  }
  return !show ? null : (
    <div onKeyDown={handleKeyDown} className='flex flex-col items-center justify-center h-screen absolute w-full bg-black/50 top-0 left-0 z-50 backdrop-blur-xl' onClick={setShow}>
        <Image onKeyDown={handleKeyDown} src={link} alt='' width={550} height={550} className={` h-3/4  aspect-square  object-contain z-20 hover:brightness-110 `} onClick={(e)=>e.stopPropagation()} />
    </div>
  )
}

export default ImagePreview