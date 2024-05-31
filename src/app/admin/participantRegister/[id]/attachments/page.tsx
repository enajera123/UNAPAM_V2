import Button from "@/components/Button/Button";
import Table from "@/components/Table/Table";
export default function Health() {
  const headersFiles = ['Nombre', "Enlace"];
  const headers = ['Nombre', 'Tipo', 'Fecha de Creación', 'Acciones'];
  return (
    <div className="container mx-auto bg-gray-gradient p-10 h-auto max-w-4xl my-4 rounded-md gap-4">
      <div className='container bg-white mt-6 p-4 rounded-xl'>
        <p className="text-3xl font-bold text-dark-gray flex justify-center">Documentos Adjuntos</p>
        <div className='mt-6'>
          <Table keys={[]} data={[]} headers={headersFiles} itemsPerPage={3} />
        </div>
        <div className='flex justify-center mt-6'>
          <Button className="bg-red-gradient w-1/3">Agregar</Button>
        </div>
      </div>
      <div className='container bg-white mt-6 p-4 rounded-xl'>
        <p className="text-3xl font-bold text-dark-gray flex justify-center">Cursos</p>
        <div className='mt-6'>
          <Table keys={[]} data={[]} headers={headers} itemsPerPage={3} />
        </div>
        <div className='flex justify-center mt-6'>
          <Button className="bg-red-gradient w-1/3">Agregar</Button>
        </div>
      </div>
    </div>

  );
}