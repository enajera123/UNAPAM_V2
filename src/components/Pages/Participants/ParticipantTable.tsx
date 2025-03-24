import Button from '@/components/Button/Button';
import { useParticipantsStore } from '@/store/participantsStore';

import { Participant, State } from '@/types/prisma';
import { confirmationAlert } from '@/utils/sweetAlert';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


function ParticipantTable({ filteredData }: { filteredData: Participant[] }) {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0)
    const router = useRouter()
    const { deleteParticipant } = useParticipantsStore()
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {
        setPage(0)
    }, [filteredData])
    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 500 }} >
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Identificación</TableCell>
                            <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Primer Apellido</TableCell>
                            <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Segundo Apellido</TableCell>
                            <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Poliza</TableCell>
                            <TableCell sx={{ fontWeight: "600", backgroundColor: "red", color: 'white' }}>Dictamen</TableCell>
                            <TableCell sx={{ textAlign: "center", fontWeight: "600", backgroundColor: "red", color: 'white' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredData).map((row, index) => (
                            <TableRow
                                onDoubleClick={() => router.push(`/admin/participantRegister/${row?.id ?? -1}`)}
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
                                    {row.identification}
                                </TableCell>
                                <TableCell >{row.firstName}</TableCell>
                                <TableCell >{row.firstSurname}</TableCell>
                                <TableCell >{row.secondSurname}</TableCell>
                                <TableCell >{row.expirationDateMedicalInsurance}</TableCell>
                                <TableCell >{row.expirationDateMedicalReport}</TableCell>
                                <TableCell >
                                    <div className='flex gap-2'>
                                        <Button
                                            onClick={() => router.push(`/admin/participantRegister/${row?.id ?? -1}`)}
                                            format className={` rounded-xl px-3 py-1 border  shadow-md  hover:bg-gray-300 hover:text-gray-800 border-gray-400 bg-white `}
                                        >Editar</Button>
                                        <Button
                                            onClick={() => confirmationAlert(() => deleteParticipant(row?.id ?? -1))}
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
        </Paper>
    )
}

export default ParticipantTable