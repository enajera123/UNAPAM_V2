import { NextRequest, NextResponse } from 'next/server';
import blobStream from 'blob-stream'
import PDFDocument from 'pdfkit';
import { NextApiResponse } from 'next';


export async function GET(req: NextRequest, res: NextApiResponse) { // Use WritableStream as the type for res
    const doc = new PDFDocument();
    doc.font('Courier-Bold')
   return NextResponse.json({ message: 'Hello World' });
}
