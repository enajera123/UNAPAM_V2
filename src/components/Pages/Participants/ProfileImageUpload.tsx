"use client"

import type React from "react"

import { useState } from "react"
import { BsCamera } from "react-icons/bs"
// import { Camera } from "lucide-react"

interface ProfileImageProps {
  image: {
    image_url: string
    image_file: string
    image_extension: string
  }
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ProfileImageUpload({ image, onChangeImage }: ProfileImageProps) {
  const [hovering, setHovering] = useState(false)

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100">
          {image.image_url ? (
            <img src={image.image_url || "/placeholder.svg"} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-4xl text-gray-400">?</div>
          )}
        </div>

        <div
          className={`absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center transition-opacity ${hovering ? "opacity-100" : "opacity-0"}`}
        >
          <label htmlFor="profile-upload" className="cursor-pointer">
            <BsCamera className="h-8 w-8 text-white" />
          </label>
          <input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={onChangeImage} />
        </div>
      </div>
      <p className="text-sm text-gray-500 text-center">Foto de perfil</p>
    </div>
  )
}

