import PDFDocument from 'pdfkit-table'
export async function generatePDF(): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise<Buffer>((resolve, reject) => {
        const doc = new PDFDocument({
            size: 'LETTER',
            bufferPages: true,
        })
        const buffer: Buffer[] = []
        doc.on('data', buffer.push.bind(buffer))
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffer)
            resolve(pdfBuffer)
        })
        doc.end()
    });
    return pdfBuffer;
}
export function generateHeader(pdfDoc: PDFKit.PDFDocument) {
    const logo = 'src/resources/LogoUNA.webp';
    pdfDoc.image(logo, 50, 45, { width: 50 })
        .image(logo, 500, 45, { width: 100, height: 80, align: 'right' })
        .moveDown();
}
export function generatePageTitle(pdfDoc: PDFKit.PDFDocument, title: any) {
    pdfDoc
        .font('Courier-Bold')
        .fillColor('#444444')
        .fontSize(20)
        .text(title, 50, pdfDoc.y + 20, { align: 'center' });
    generateHr(pdfDoc, pdfDoc.y + 2);
}
export function generateHr(pdfDoc: PDFKit.PDFDocument, y_padding: number) {
    pdfDoc
        .strokeColor('#aaaaaa')
        .lineWidth(1)
        .moveTo(50, y_padding)
        .lineTo(550, y_padding)
        .stroke();
}