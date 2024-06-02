import Button from '@/components/Button/Button'
import Table from '@/components/Table/Table'
import React, { useEffect } from 'react'
import { useCourseStore as useCoursesStore } from '@/hooks/Stores/CourseStore/useCourseStore'
import { ParticipantOnCourse,Course, StateParticipantOnCourse,State } from '@/types/prisma'
import { useParticipantOnCourseStore } from '@/store/participantOnCourseStore'
import { errorAlert, successAlert } from '@/utils/sweetAlert';

const EnrollCourses = ({participantId,participantCourses,updateParticipantCourses}:{participantId:number,participantCourses:ParticipantOnCourse[],updateParticipantCourses:(item:ParticipantOnCourse)=>void}) => {

    const [buttonCursos,setButtonCursos] = React.useState<Course[]>([])
    const {postParticipantOnCourse,putParticipantOnCourse} = useParticipantOnCourseStore()
    const { courses } = useCoursesStore()

    
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
        return <Button onClick={actualizarParticipantCourse}>{titulo}</Button>
    } 

    useEffect(() => {
        if(courses){
            setButtonCursos(courses.filter((i)=>i.state!=State.Inactive).map((course)=>({
                ...course,
                accion:participantCourses.find((i)=>i.courseId===course.id) ?
                    participantCourses.find((i)=>i.courseId===course.id)?.state==='Registered' ? 
                    botonAccion(participantId,course?.id!,true,StateParticipantOnCourse.Retired,"Desmatricular") : 
                    participantCourses.find((i)=>i.courseId===course.id)?.state==='Retired' ? 
                    botonAccion(participantId,course?.id!,true,StateParticipantOnCourse.Registered,"Matricular") : <span>Curso finalizado</span> :
                    botonAccion(participantId,course?.id!,false,StateParticipantOnCourse.Registered,"Matricular"),

                finalizar:participantCourses.find((i)=>i.courseId===course.id) ? 
                participantCourses.find((i)=>i.courseId===course.id)?.state==='Finished' ? 
                <span>Curso finalizado</span>:participantCourses.find((i)=>i.courseId===course.id)?.state==="Registered" ? 
                botonAccion(participantId,course?.id!,true,StateParticipantOnCourse.Finished,"Finalizar"):null:null

            })) as Course[])
        }
    },[courses,participantCourses])

    return (
        <div className="container mx-auto bg-gray-gradient p-10 h-auto max-w-4xl my-4 rounded-md gap-4">
            <p className="text-3xl font-bold text-white flex justify-center">Matricular cursos</p>
            <div className='mt-6'>
                <Table keys={['name','courseNumber','professor','accion','finalizar']}
                       data={buttonCursos} 
                       headers={['Nombre', 'Código', 'Profesor','Accion','Finalizar']} 
                       itemsPerPage={5}
                /> 
            </div>
        </div>
    )
}

export default EnrollCourses