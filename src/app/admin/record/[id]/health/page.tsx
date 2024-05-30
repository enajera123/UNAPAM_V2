import InputField from "@/components/InputField/InputField";
import Select from "@/components/Select/Select";
import Button from "@/components/Button/Button";
import TextArea from "@/components/TextArea/TextArea";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { BsHeartPulse } from "react-icons/bs";
import { GoPerson, GoPersonAdd } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import logoUNAPAM from '@/resources/LogoWhite.png';
import Image from 'next/image';
import { BiInjection } from "react-icons/bi";

export default function Health() {
  const optionsBloodType = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "NA", label: "Sin proporcionar" },
  ];
  const optionsKinship = [
    { value: "A+", label: "Hijo/a" },
    { value: "A-", label: "Pareja/Conyugue" },
    { value: "B+", label: "Hermano/a" },
    { value: "B-", label: "Otro" },
  ];

  return (

    <div className="container mx-auto bg-gray-gradient p-10 my-4 rounded-3xl ">
      <div className="flex flex-row items-center">
        <div className="flex-initial w-1/4">
          <Select
            label="Tipo Sanguineo"
            placeholder="Tipo Sanguineo"
            icon={<BiInjection color="white" />}
            options={optionsBloodType} />
        </div>
        <div className="w-2/3 flex justify-end">
          <div className="ml-auto">
            <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-64 h-auto" />
          </div>
        </div>
      </div>
      <div className="flex items-center ">
        <div className="flex-initial w-1/3 ">
          <p className="text-xl font-bold text-light-gray">Enfermedades</p>
          <InputField
            label="Enfermedad"
            placeholder="Enfermedad"
            iconStart={<BsHeartPulse color="white" />} />
          <InputField
            label="Tratamiento"
            placeholder="Tratamiento"
            iconStart={<AiOutlineMedicineBox color="white" />} />
        </div>
        <div className="w-2/3 pl-10">
          <TextArea
            placeholder="Descripción"
            rows={4} />
          <div className="mt-6">
            <TextArea
              placeholder="Descripción"
              rows={4} />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6 ">
        <Button className="bg-red-gradient">Agregar otra información</Button>
      </div>
      <div className="flex-initial w-1/4">
        <p className="text-xl font-bold text-light-gray">Personas de Contacto</p>
        <Select
          label="Parentesco"
          placeholder="Parentesco"
          icon={<GoPersonAdd color="white" />}
          options={optionsKinship} />
      </div>
      <div className="flex items-center ">
        <div className="flex-initial w-1/3">
          <InputField
            label="Nombre"
            placeholder="Nombre"
            iconStart={<GoPerson color="white" />} />
        </div>
        <div className="flex-initial w-1/3 pl-5">
          <InputField
            label="Primer Apellido"
            placeholder="Primer Apellido"
            iconStart={<GoPerson color="white" />} />
        </div>
        <div className="flex-initial w-1/3 pl-5">
          <InputField
            label="Teléfono"
            placeholder="Teléfono"
            iconStart={<FiPhoneCall color="white" />} />
        </div>
      </div>
      <div className="flex-initial w-1/4">
        <Select
          label="Parentesco"
          placeholder="Parentesco"
          icon={<GoPersonAdd color="white" />}
          options={optionsKinship} />
      </div>
      <div className="flex items-center ">
        <div className="flex-initial w-1/3">
          <InputField
            label="Nombre"
            placeholder="Nombre"
            iconStart={<GoPerson color="white" />} />
        </div>
        <div className="flex-initial w-1/3 pl-5">
          <InputField
            label="Primer Apellido"
            placeholder="Primer Apellido"
            iconStart={<GoPerson color="white" />} />
        </div>
        <div className="flex-initial w-1/3 pl-5">
          <InputField
            label="Teléfono"
            placeholder="Teléfono"
            iconStart={<FiPhoneCall color="white" />} />
        </div>
      </div>
      <div className="flex items-center pl-10 ">
        <div className="flex-initial w-1/3"></div>
        <div className="flex-initial w-1/3">
          <Button className="bg-red-gradient w-60">Aceptar</Button>
        </div>
        <div className="flex-initial w-1/3">
          <Button className="bg-red-gradient w-60">Eliminar</Button>
        </div>
      </div>
    </div>
  );
}