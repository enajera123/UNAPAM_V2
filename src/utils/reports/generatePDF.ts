import { Course } from '@/types/prisma'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export async function generateCoursePDF(course: Course) {
    const doc = new jsPDF()
    doc.setFontSize(10);
    doc.addImage("/LogoUNA.png", 'PNG', 10, 20, 20, 15);
    doc.addImage('/LogoColorful.png', 'PNG', doc.internal.pageSize.width - 40, 20, 17, 20);
    doc.setFont('helvetica', 'bold')
    doc.text('Universidad Nacional - UNAPAM', doc.internal.pageSize.width / 2, 20, { align: 'center', });
    doc.setFont('helvetica', 'bold')
    doc.text('Reporte del curso', doc.internal.pageSize.width / 2, 40, { align: 'center' });
    doc.setFont('helvetica', 'normal')
    doc.text(`Nombre: ${course.name}`, 10, 50)
    doc.text(`Número de curso: ${course.courseNumber}`, 10, 55)
    doc.text(`Descripción: ${course.description}`, 10, 60)
    doc.text(`Profesor: ${course.professor}`, 10, 65)
    doc.text(`Cupo: ${course.quota}`, 10, 70)
    doc.text(`Fecha de inicio: ${course.initialDate}`, 10, 75)
    doc.text(`Fecha de finalización: ${course.finalDate}`, 10, 80)
    doc.text(`Estado: ${course.state}`, 10, 85)
    doc.text(`Necesita reporte médico: ${course.needMedicalReport}`, 10, 90)
    const list = (course.participantsOnCourses?.map((participant) => [participant.participants?.firstName || "", participant.participants?.firstSurname || "", participant.participants?.secondSurname || "", participant.state]) || [])
    if (list.length === 0) {
        doc.setFont('helvetica', 'bold')
        doc.text('No hay participantes', 10, 95)
    } else {
        doc.text('Participantes', 10, 95)
        autoTable(doc, {
            head: [
                [{
                    content: 'Nombre',
                    styles: { fillColor: [255, 0, 0] },
                },
                {
                    content: 'Primer Apellido',
                    styles: { fillColor: [255, 0, 0] },
                },
                {
                    content: 'Segundo Apellido',
                    styles: { fillColor: [255, 0, 0] },
                },
                {
                    content: 'Estado',
                    styles: { fillColor: [255, 0, 0] },
                }]],
            startY: 100,
            body: list
        })
    }
    doc.save('a4.pdf')
}