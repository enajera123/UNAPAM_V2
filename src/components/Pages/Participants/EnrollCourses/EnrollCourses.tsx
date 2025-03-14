import React, { useEffect, useState } from 'react';
import { useCourseStore as useCoursesStore } from '@/hooks/Stores/CourseStore/useCourseStore';
import { useParticipantOnCourseStore } from '@/store/participantOnCourseStore';
import { enrollCoursesConfirmationAlert, errorAlert } from '@/utils/sweetAlert';
import { useHandleSearch } from '@/hooks/Table/useHandleSearch';
import SearchBar from '@/components/SearchBar/SearchBar';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import Button from '@/components/Button/Button';
import { ParticipantOnCourse, Course, StateParticipantOnCourse, Participant } from '@/types/prisma';

const EnrollCourses = ({ participant }: { participant: Participant }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const { postParticipantOnCourse, putParticipantOnCourse } = useParticipantOnCourseStore();
    const { courses, setCourses } = useCoursesStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<Course[]>(courses);
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const { handleSearch } = useHandleSearch<Course>({ setFilterData: setFilteredData, searchTerm, setRandomNumber });
    const [participantState, setParticipantState] = useState<Participant>(participant);

    useEffect(() => setParticipantState(participant), [participant]);
    useEffect(() => setPage(0), [filteredData]);

    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const updateParticipantCourses = async ({ participantId, courseId, state }: ParticipantOnCourse) => {
        const action = participantState.participantsOnCourses?.find(i => i.courseId === courseId) ? putParticipantOnCourse : postParticipantOnCourse;
        const response = await action({ participantId, courseId, state });
        if (!response) return errorAlert('Error al actualizar el estado del participante en el curso');

        setParticipantState(prev => ({
            ...prev,
            participantsOnCourses: [...(prev.participantsOnCourses ?? []).filter(i => i.courseId !== courseId), response]
        }));
        setCourses(courses.map(course => course.id === courseId ? {
            ...course,
            participantsOnCourses: [...(course.participantsOnCourses ?? []).filter(i => i.participantId !== participantId), response]
        } : course));
    };

    return (
        <div className="bg-dark-gray p-4 h-auto">
            <h2 className="text-white font-bold text-lg mb-4 mt-0">Búsqueda de cursos</h2>
            <div className="w-full gap-3 mb-3 flex justify-between items-center">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={() => handleSearch(courses)} showSelect={false} />
            </div>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 350 }}>
                    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="a dense table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'red' }}>
                                <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Código</TableCell>
                                <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Cupo Disponible</TableCell>
                                <TableCell sx={{ textAlign: "center", fontWeight: "600", backgroundColor: "red", color: 'white' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0 ? courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : courses).map((course, index) => {
                                const availableQuota = course.quota - (course.participantsOnCourses?.filter(p => p.state !== StateParticipantOnCourse.Retired)?.length ?? 0);
                                const participantOnCourse = participantState.participantsOnCourses?.find(i => i.courseId === course.id);
                                const isRegistered = participantOnCourse?.state === StateParticipantOnCourse.Registered;
                                const isRetired = participantOnCourse?.state === StateParticipantOnCourse.Retired;

                                return (
                                    <TableRow key={course.id} sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        backgroundColor: (theme) => (index % 2 === 0 ? theme.palette.grey[500] : theme.palette.grey[300]),
                                        "&:hover": { backgroundColor: (theme) => theme.palette.grey[600] }
                                    }}>
                                        <TableCell component="th" scope="row">{course.name}</TableCell>
                                        <TableCell>{course.courseNumber}</TableCell>
                                        <TableCell>{availableQuota}</TableCell>
                                        <TableCell align='center'>
                                            {availableQuota > 0 || isRegistered ? (
                                                participantOnCourse ? (
                                                    isRegistered ? (
                                                        <Button type='button' onClick={() => enrollCoursesConfirmationAlert(() => updateParticipantCourses({ participantId: participantState.id ?? 0, courseId: course.id ?? 0, state: StateParticipantOnCourse.Retired }), "retirar")}>Retirar</Button>
                                                    ) : isRetired ? (
                                                        <Button type='button' onClick={() => enrollCoursesConfirmationAlert(() => updateParticipantCourses({ participantId: participantState.id ?? 0, courseId: course.id ?? 0, state: StateParticipantOnCourse.Registered }), "matricular")}>Matricular</Button>
                                                    ) : <span>No disponible</span>
                                                ) : (
                                                    <Button type='button' onClick={() => enrollCoursesConfirmationAlert(() => updateParticipantCourses({ participantId: participantState.id ?? 0, courseId: course.id ?? 0, state: StateParticipantOnCourse.Registered }), "matricular")}>Matricular</Button>
                                                )
                                            ) : (
                                                <span className='text-red-700 font-bold'>No hay cupos disponibles</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    style={{ color: 'black' }}
                    labelRowsPerPage="Filas por página"
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    onPageChange={handleChangePage}
                    component="div"
                    rowsPerPageOptions={[10, 15, 25, 50, { label: 'Todo', value: -1 }]}
                    colSpan={3}
                    count={courses.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                        select: {
                            inputProps: { 'aria-label': 'filas por página' },
                            native: true,
                        },
                    }}
                />
            </Paper>
        </div>
    );
};

export default EnrollCourses;
