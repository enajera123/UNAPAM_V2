import Button from '@/components/Button/Button';
import { useCourseStore } from '@/store/coursesStore';
import { Course, State } from '@/types/prisma';
import { confirmationAlert } from '@/utils/sweetAlert';
import { Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function CourseTable({ filteredData }: { filteredData: Course[] }) {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0)
    const router = useRouter()
    const { updateCourse, deleteCourse } = useCourseStore()
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const toggleUserState = async (id: number) => {
        const user = filteredData.find((u) => u.id === id);
        if (user) {
            const newState = user.state === "Inactive" ? "Active" : "Inactive";
            await updateCourse(id, { ...user, state: newState as State });
        }
    }
    const seeParticipants = (courseId: number) => {
        router.push(`/admin/participants/${courseId}`)
    }
    useEffect(() => {
        setPage(0)
    }, [filteredData])
    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 500 }} >
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Codigo</TableCell>
                            <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Profesor</TableCell>
                            <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Cupo</TableCell>
                            <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Fecha de Inicio</TableCell>
                            <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Estado</TableCell>
                            <TableCell sx={{ textAlign: "center", fontWeight: "600", backgroundColor: "red", color: 'white' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredData).map((row, index) => (
                            <TableRow
                                onDoubleClick={() => router.push(`/admin/courseRegister/${row?.id ?? -1}`)}
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
                                <TableCell >{row.courseNumber}</TableCell>
                                <TableCell >{row.professor}</TableCell>
                                <TableCell >{row.quota}</TableCell>
                                <TableCell >{row.initialDate}</TableCell>
                                <TableCell >   <Switch
                                    checked={row.state === "Active"}
                                    onChange={() => row.id !== undefined && toggleUserState(row.id)}
                                    color="error"
                                /></TableCell>
                                <TableCell >
                                    <div className='flex gap-2'>
                                        <Button
                                            onClick={() => seeParticipants(row?.id ?? -1)}
                                            format className={` rounded-xl px-3 py-1 border  shadow-md  hover:bg-gray-300 hover:text-gray-800 border-gray-400 bg-white `}
                                        >Ver Participantes</Button>
                                        <Button
                                            onClick={() => confirmationAlert(() => deleteCourse(row?.id ?? -1))}
                                            className={` rounded-xl px-3 py-1 border  shadow-md  hover:bg-gray-300 hover:text-gray-800 border-gray-400 bg-white `}
                                        >Eliminar</Button>

                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                labelRowsPerPage="Filas por página"
                onRowsPerPageChange={handleChangeRowsPerPage}
                onPageChange={handleChangePage}
                component="div"
                rowsPerPageOptions={[10, 15, 25, 50, { label: 'Todo', value: -1 }]}
                colSpan={3}
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                    select: {
                        inputProps: {
                            'aria-label': 'rows per page',
                        },
                        native: true,
                    },
                }}
            />
        </Paper >
    )
}

export default CourseTable