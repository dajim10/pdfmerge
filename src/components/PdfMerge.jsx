// App.js

import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function PdfMerge() {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [mergedPdf, setMergedPdf] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setPdfFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleRemoveFile = (index) => {
        setPdfFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setPdfFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleRefresh = () => {
        setPdfFiles([]);
        setMergedPdf(null);
    }


    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDropAreaClick = () => {
        fileInputRef.current.click();
    };

    const mergePDFs = async () => {
        const pdfDoc = await PDFDocument.create();
        for (const file of pdfFiles) {
            const pdfBytes = await file.arrayBuffer();
            const externalPdfDoc = await PDFDocument.load(pdfBytes);
            const copiedPages = await pdfDoc.copyPages(externalPdfDoc, externalPdfDoc.getPageIndices());
            copiedPages.forEach((page) => pdfDoc.addPage(page));
        }
        const mergedPdfBytes = await pdfDoc.save();
        const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        setMergedPdf(URL.createObjectURL(blob));
    };

    return (
        <Container className="py-5">
            <Row className="mb-3">
                <Col>
                    <h1>รวมไฟล์ PDF</h1>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <div
                        className="drop-area"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={handleDropAreaClick}
                    >
                        <p>ลากไฟล์ หรือคลิกเพื่อเลือก PDF ไฟล์ ที่ต้องการรวม มาบริเวณนี้</p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept=".pdf"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ul>
                        {pdfFiles.map((file, index) => (
                            <li key={index}>
                                {file.name}{' '}
                                <Button variant="danger" size="sm" onClick={() => handleRemoveFile(index)}>
                                    Remove
                                </Button>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
            <Row className='d-'>
                <Col>
                    <Button variant="primary" className='mx-2' onClick={mergePDFs}>รวมไฟล์ PDF</Button>
                    <Button variant="danger" className="mx-2" onClick={handleRefresh}>ล้างข้อมูล</Button>
                    <Button variant="dark" className="mx-2" onClick={() => {
                        sessionStorage.removeItem('token')
                        navigate('/login')
                    }}>
                        <FontAwesomeIcon icon={faRightFromBracket} />{''}
                        Logout</Button>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    {mergedPdf && <iframe title="Merged PDF" src={mergedPdf} width="100%" height="600px" />}
                </Col>
            </Row>
        </Container>
    );
}

export default PdfMerge;
