import { image_format } from "./../../../types/prisma";
import { useState } from "react";

export default function useImageStore() {
  const [image, setImage] = useState<image_format>({
    image_name: "",
    image_file: "",
    image_path: "",
    image_url: "/images/userIcon.png",
    image_extension: "",
  });
  const [imagePreview, setImagePreview] = useState<image_format>({
    image_name: "",
    image_file: "",
    image_path: "",
    image_url: "/images/userIcon.png",
    image_extension: "",
  });
  const [preview, setPreview] = useState<boolean>(false);

  const handleSetImageBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onload = (item) => {
      if (item.target && item.target.result) {
        const base64String = item.target.result
          .toString()
          .replace("data:", "")
          .replace(/^.+,/, "");
        setImage((i) => ({
          ...i,
          image_file: base64String,
          image_extension: file.name.split(".").pop()!,
          image_name: file.name.split(".")[0],
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size < 1024 * 1024) {
        setImage((i) => ({
          ...i,
          image_url: URL.createObjectURL(event.target.files![0]),
          image_name: event.target.files![0].name,
        }));
        return handleSetImageBase64(event.target.files[0]);
      }
    }
  };

  return {
    preview,
    handleSetImageBase64,
    setImage,
    image,
    setPreview,
    onChangeImage,
    imagePreview,
    setImagePreview,
  };
}
