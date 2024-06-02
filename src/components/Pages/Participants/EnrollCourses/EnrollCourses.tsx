import Button from '@/components/Button/Button'
import Table from '@/components/Table/Table'
import React, { useEffect, useState } from 'react'
import { useCourseStore as useCoursesStore } from '@/hooks/Stores/CourseStore/useCourseStore'
import { ParticipantOnCourse,Course, StateParticipantOnCourse,State } from '@/types/prisma'
import { useParticipantOnCourseStore } from '@/store/participantOnCourseStore'
import { confirmationAlert, enrollCoursesConfirmationAlert, errorAlert, successAlert } from '@/utils/sweetAlert';
import { useHandleSearch } from '@/hooks/Table/useHandleSearch'
import SearchBar from '@/components/SearchBar/SearchBar'

const EnrollCourses = ({participantId,participantCourses,updateParticipantCourses}:{participantId:number,participantCourses:ParticipantOnCourse[],updateParticipantCourses:(item:ParticipantOnCourse)=>void}) => {

    const [buttonCursos,setButtonCursos] = React.useState<Course[]>([])
    const {postParticipantOnCourse,putParticipantOnCourse} = useParticipantOnCourseStore()
    const { courses } = useCoursesStore()
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<Course[]>(courses);
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const { handleSearch } = useHandleSearch<Course>({ setFilterData: setFilteredData, searchTerm, setRandomNumber })
    
    const botonAccion = (participantId:number,courseId:number,matriculado:boolean,state:StateParticipantOnCourse,titulo:string) => {
        const actualizarParticipantCourse = async () => {
            if(!matriculado){
                try{
                    const result = await postParticipantOnCourse({
                        participantId,
                        courseId,
                        state:StateParticipantOnCourse.Registered
                    })
                    updateParticipantCourses(result!)
                    successAlert("Matricula realizada exitosamente")
                }catch(error){
                    errorAlert("Error al realizar la matricula")
                }
            }else{
                try{
                    const result = await putParticipantOnCourse({
                        participantId,
                        courseId,
                        state
                    })
                    updateParticipantCourses(result!)
                    successAlert("Matricula modificada correctamente")
                }catch(error){
                    errorAlert("Error al modificar la matricula")
                }
                
            }
        }
        return <Button onClick={() => enrollCoursesConfirmationAlert(actualizarParticipantCourse,titulo) }>{titulo}</Button>
    } 

    const updateCourses = (list:Course[]) =>{
        if(list){
            console.log(list)
            console.log(participantCourses)
            setButtonCursos(list.filter((i)=>i.state!=State.Inactive).map((course)=>({
                ...course,
                accion:participantCourses.find((i)=>i.courseId===course.id) ?
                    participantCourses.find((i)=>i.courseId===course.id)?.state==='Registered' ? 
                    botonAccion(participantId,course?.id!,true,StateParticipantOnCourse.Retired,"Retirar") : 
                    participantCourses.find((i)=>i.courseId===course.id)?.state==='Retired' ? 
                    botonAccion(participantId,course?.id!,true,StateParticipantOnCourse.Registered,"Matricular") : <span>No disponible</span> :
                    botonAccion(participantId,course?.id!,false,StateParticipantOnCourse.Registered,"Matricular"),

                finalizar:participantCourses.find((i)=>i.courseId===course.id) ? 
                participantCourses.find((i)=>i.courseId===course.id)?.state==='Finished' ? 
                <span>No disponible</span>:participantCourses.find((i)=>i.courseId===course.id)?.state==="Registered" ? 
                botonAccion(participantId,course?.id!,true,StateParticipantOnCourse.Finished,"Finalizar"):null:null,
                estado:participantCourses.find((i)=>i.courseId===course.id)?participantCourses.find((i)=>i.courseId===course.id)?.state==='Finished'?<span>Finalizado</span>:
                participantCourses.find((i)=>i.courseId===course.id)?.state==='Retired'?<span>Retirado</span>:
                participantCourses.find((i)=>i.courseId===course.id)?.state==='Registered'?<span>Matriculado</span>:null:null
            })) as Course[])
        }
    }
    useEffect(() => {
        console.log(filteredData)
        updateCourses(filteredData)
    }, [filteredData,participantCourses])

    useEffect(() => {
        console.log(courses)
        updateCourses(courses)
    },[courses,participantCourses])

    return (
        <div className="container mx-auto bg-gray-gradient p-10 h-auto max-w-4xl my-4 rounded-md gap-4">
            <p className="text-3xl font-bold text-white flex justify-center">Matricular cursos</p>
            <h2 className="text-white font-bold text-2xl mb-4 mt-0">
                Búsqueda de cursos
            </h2>
            <div className="w-full gap-3 mb-3 flex justify-between items-center">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={() => handleSearch(courses)}
                    showSelect={false}
                />
            </div>
            <div className='mt-6'>
            {buttonCursos.length > 0 ? (
                <Table keys={['name','courseNumber','professor','estado','accion','finalizar']}
                       data={buttonCursos} 
                       headers={['Nombre', 'Código', 'Profesor','Estado','Accion','Finalizar']} 
                       itemsPerPage={5}
                /> 
            ) : (
                <p>No se encontraron resultados</p>
            )}
            </div>
        </div>
    )
}

export default EnrollCourses