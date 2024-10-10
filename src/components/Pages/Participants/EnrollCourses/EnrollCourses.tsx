import Button from '@/components/Button/Button'
import React, { useEffect, useState } from 'react'
import { useCourseStore as useCoursesStore } from '@/hooks/Stores/CourseStore/useCourseStore'
import { ParticipantOnCourse, Course, StateParticipantOnCourse, State } from '@/types/prisma'
import { useParticipantOnCourseStore } from '@/store/participantOnCourseStore'
import { enrollCoursesConfirmationAlert, errorAlert, successAlert } from '@/utils/sweetAlert';
import { useHandleSearch } from '@/hooks/Table/useHandleSearch'
import SearchBar from '@/components/SearchBar/SearchBar'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'

const EnrollCourses = ({ participantId, participantCourses, updateParticipantCourses }: { participantId: number, participantCourses: ParticipantOnCourse[], updateParticipantCourses: (item: ParticipantOnCourse) => void }) => {

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [buttonCursos, setButtonCursos] = useState<Course[]>([]);
    const { postParticipantOnCourse, putParticipantOnCourse } = useParticipantOnCourseStore();
    const { courses } = useCoursesStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<Course[]>(courses);
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const { handleSearch } = useHandleSearch<Course>({ setFilterData: setFilteredData, searchTerm, setRandomNumber });

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {
        setPage(0)
    }, [filteredData])
    const botonAccion = (participantId: number, courseId: number, matriculado: boolean, state: StateParticipantOnCourse, titulo: string) => {
        const actualizarParticipantCourse = async () => {
            const course = courses.find((i) => i.id === courseId);
            console.log(state)
            if (state === StateParticipantOnCourse.Registered && (course?.quota && course?.quota <= (course?.participantsOnCourses?.filter(participant => participant.state === StateParticipantOnCourse.Registered)?.length ?? -1))) {
                errorAlert("No hay cupos disponibles");
                return;
            }
            if (!matriculado) {
                try {
                    const result = await postParticipantOnCourse({
                        participantId,
                        courseId,
                        state: StateParticipantOnCourse.Registered
                    });
                    updateParticipantCourses(result!);
                    successAlert("Matricula realizada exitosamente");
                } catch (error) {
                    errorAlert("Error al realizar la matricula");
                }
            } else {
                try {
                    const result = await putParticipantOnCourse({
                        participantId,
                        courseId,
                        state
                    });
                    updateParticipantCourses(result!);
                    successAlert("Matricula modificada correctamente");
                } catch (error) {
                    errorAlert("Error al modificar la matricula");
                }
            }
        };
        return <Button onClick={() => enrollCoursesConfirmationAlert(actualizarParticipantCourse, titulo)}>{titulo}</Button>;
    };

    const updateCourses = (list: Course[]) => {
        if (list) {
            setButtonCursos(list.filter((i) => i.state != State.Inactive).map((course) => ({
                ...course,
                accion: participantCourses?.find((i) => i.courseId === course.id) ?
                    participantCourses?.find((i) => i.courseId === course.id)?.state === 'Registered' ?
                        botonAccion(participantId, course?.id!, true, StateParticipantOnCourse.Retired, "Retirar") :
                        participantCourses?.find((i) => i.courseId === course.id)?.state === 'Retired' ?
                            botonAccion(participantId, course?.id!, true, StateParticipantOnCourse.Registered, "Matricular") : <span>No disponible</span> :
                    botonAccion(participantId, course?.id!, false, StateParticipantOnCourse.Registered, "Matricular"),
                finalizar: participantCourses?.find((i) => i.courseId === course.id) ?
                    participantCourses?.find((i) => i.courseId === course.id)?.state === 'Finished' ?
                        <span>No disponible</span> : participantCourses?.find((i) => i.courseId === course.id)?.state === "Registered" ?
                            botonAccion(participantId, course?.id!, true, StateParticipantOnCourse.Finished, "Finalizar") : null : null,
                estado: participantCourses?.find((i) => i.courseId === course.id) ? participantCourses?.find((i) => i.courseId === course.id)?.state === 'Finished' ? <span>Finalizado</span> :
                    participantCourses?.find((i) => i.courseId === course.id)?.state === 'Retired' ? <span>Retirado</span> :
                        participantCourses?.find((i) => i.courseId === course.id)?.state === 'Registered' ? <span>Matriculado</span> : null : null
            })) as Course[]);
        }
    };

    useEffect(() => {
        updateCourses(filteredData);
    }, [filteredData, participantCourses]);

    useEffect(() => {
        updateCourses(courses);
    }, [courses, participantCourses]);

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                <TableContainer sx={{ maxHeight: 350 }}>
                    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="a dense table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'red' }}>
                                <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Codigo</TableCell>
                                <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Estado</TableCell>
                                <TableCell sx={{ textAlign: "center", fontWeight: "600", backgroundColor: "red", color: 'white' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0 ? buttonCursos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : buttonCursos).map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        backgroundColor: (theme) => (index % 2 === 0 ? theme.palette.grey[500] : theme.palette.grey[300]),
                                        "&:hover": {
                                            backgroundColor: (theme) => theme.palette.grey[600]
                                        }
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.courseNumber}</TableCell>
                                    <TableCell>{(row as any).estado}</TableCell>
                                    <TableCell>
                                        <div className='flex gap-2'>
                                            {(row as any).accion}
                                            {(row as any).finalizar}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    style={{ color: 'white' }}
                    labelRowsPerPage="Filas por página"
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    onPageChange={handleChangePage}
                    component="div"
                    rowsPerPageOptions={[10, 15, 25, 50, { label: 'Todo', value: -1 }]}
                    colSpan={3}
                    count={buttonCursos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                        select: {
                            inputProps: {
                                'aria-label': 'filas por página',
                            },
                            native: true,
                        },
                    }}
                />
            </div>

        </Paper>
    );
}

export default EnrollCourses