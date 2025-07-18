'use client';

import React, { useState, useRef, useEffect } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { Rnd } from 'react-rnd';
import { PDFDocument } from 'pdf-lib';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {Container, Paper, Button, Box, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

type FirmaData = {
    xPct: number;
    yPct: number;
    widthPct: number;
    heightPct: number;
    firmaURL: string;
};

export default function PdfFirma({ firmaDibujada }: { firmaDibujada: string | null }) {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [firmaFiles, setFirmaFiles] = useState<File[]>([]);
    const [firmaURLs, setFirmaURLs] = useState<string[]>([]);
    const [selectedFirmaIndex, setSelectedFirmaIndex] = useState<number>(0);
    const [numPages, setNumPages] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [firmaPositions, setFirmaPositions] = useState<Record<number, FirmaData[]>>({});
    const [viewportSize, setViewportSize] = useState<{ width: number; height: number } | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (pdfFile) renderPdfPage(pageNumber);
    }, [pdfFile, pageNumber]);

    const renderPdfPage = async (pageNum: number) => {
        if (!pdfFile) return;
        const arrayBuffer = await pdfFile.arrayBuffer();
        const pdf = await getDocument({ data: arrayBuffer }).promise;
        setNumPages(pdf.numPages);
        const page = await pdf.getPage(pageNum);

        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d')!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        setViewportSize({ width: viewport.width, height: viewport.height });

        context.clearRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: context, viewport }).promise;
    };

    const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setPdfFile(file);
        setFirmaPositions({});
        setPageNumber(1);
    };

    const agregarFirmaSeleccionada = () => {
        const url = firmaURLs[selectedFirmaIndex];
        if (!url) return;
        agregarFirmaAPagina(url);
    };

    const agregarFirmaAPagina = (firmaURL: string) => {
        setFirmaPositions((prev) => ({
            ...prev,
            [pageNumber]: [
                ...(prev[pageNumber] || []),
                {
                    xPct: 0.1,
                    yPct: 0.1,
                    widthPct: 0.2,
                    heightPct: 0.15,
                    firmaURL,
                },
            ],
        }));
    };

    const actualizarFirma = (index: number, data: { x: number; y: number; width: number; height: number }) => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const { width, height } = canvas.getBoundingClientRect();

        setFirmaPositions((prev) => {
            const nuevasFirmas = [...(prev[pageNumber] || [])];
            nuevasFirmas[index] = {
                ...nuevasFirmas[index],
                xPct: data.x / width,
                yPct: data.y / height,
                widthPct: data.width / width,
                heightPct: data.height / height,
            };
            return { ...prev, [pageNumber]: nuevasFirmas };
        });
    };

    const eliminarFirma = (index: number) => {
        setFirmaPositions(prev => {
            const firmasPagina = prev[pageNumber] || [];
            const nuevasFirmas = firmasPagina.filter((_, i) => i !== index);
            return { ...prev, [pageNumber]: nuevasFirmas };
        });
    };

    const handleGuardarPdfFirmado = async () => {
        if (!pdfFile || !viewportSize) {
            alert('Por favor sube un PDF.');
            return;
        }

        const pdfBytes = await pdfFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);

        for (let pageIndex = 0; pageIndex < pdfDoc.getPageCount(); pageIndex++) {
            const page = pdfDoc.getPages()[pageIndex];
            const pageWidth = page.getWidth();
            const pageHeight = page.getHeight();
            const firmasEnPagina = firmaPositions[pageIndex + 1] || [];

            for (const firma of firmasEnPagina) {
                const firmaBytes = await fetch(firma.firmaURL).then(res => res.arrayBuffer());
                const firmaImage = await pdfDoc.embedPng(firmaBytes);

                page.drawImage(firmaImage, {
                    x: firma.xPct * pageWidth,
                    y: pageHeight - (firma.yPct * pageHeight + firma.heightPct * pageHeight),
                    width: firma.widthPct * pageWidth,
                    height: firma.heightPct * pageHeight,
                });
            }
        }

        const newPdfBytes = await pdfDoc.save();
        const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'documento_firmado.pdf';
        a.click();
    };

    const paperStyle = {
        p: 4,
        borderTop: "3px solid #005da6",
        borderRadius: 2,
        boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
        background: "#eee",
        fontFamily: "tahoma, arial, verdana, sans-serif",
    };

    return (
        <Container  sx={{ mt: 0 }}>
            <Typography variant="h6">Firmar documento</Typography>

            <Paper elevation={3} sx={paperStyle}>
                <Box sx={{ p: 3, maxWidth: '900px', mx: 'auto' }}>
                    <Box sx={{ mb: 2 }}>
                        <label>Subir PDF: </label>
                        <input type="file" accept="application/pdf" onChange={handlePdfChange} />
                    </Box>

                    {firmaURLs.length > 0 && (
                        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                            <label>Seleccionar Firma:</label>
                            <select
                                value={selectedFirmaIndex}
                                onChange={(e) => setSelectedFirmaIndex(parseInt(e.target.value))}
                            >
                                {firmaURLs.map((url, idx) => (
                                    <option key={idx} value={idx}>
                                        Firma {idx + 1}
                                    </option>
                                ))}
                            </select>
                            <Button variant="contained" onClick={agregarFirmaSeleccionada} sx={{ bgcolor: '#005799' }}>
                                Agregar esta firma a la página {pageNumber}
                            </Button>
                        </Box>
                    )}



                    {pdfFile && (
                        <>
                            <Stack spacing={2} direction="row" justifyContent="center" sx={{ my: 2 }}>
                                <Pagination
                                    count={numPages}
                                    page={pageNumber}
                                    onChange={(_, value) => setPageNumber(value)}
                                    color="primary"
                                    shape="rounded"
                                    size="medium"
                                    siblingCount={0}
                                />
                            </Stack>

                            <Box
                                sx={{
                                    position: 'relative',
                                    border: '1px solid #ccc',
                                    mt: 3,
                                    width: '100%',
                                    // maxWidth: '900px',
                                    // mx: 'auto',
                                    maxWidth: { xs: '100%', md: '1200px' },
                                    mx: 'auto',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        pt: '130%',
                                        background: '#f9f9f9',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <canvas
                                        ref={canvasRef}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            border: '1px solid black',
                                            display: 'block',
                                        }}
                                    />

                                    {firmaPositions[pageNumber]?.map((firma, index) => (
                                        <Rnd
                                            key={index}
                                            bounds="parent"
                                            size={{
                                                width: `${firma.widthPct * 100}%`,
                                                height: `${firma.heightPct * 100}%`,
                                            }}
                                            position={{
                                                x: firma.xPct * (canvasRef.current?.getBoundingClientRect().width || 1),
                                                y: firma.yPct * (canvasRef.current?.getBoundingClientRect().height || 1),
                                            }}
                                            onDragStop={(_, d) =>
                                                actualizarFirma(index, {
                                                    x: d.x,
                                                    y: d.y,
                                                    width: (firma.widthPct * (canvasRef.current?.getBoundingClientRect().width || 1)),
                                                    height: (firma.heightPct * (canvasRef.current?.getBoundingClientRect().height || 1)),
                                                })
                                            }
                                            onResizeStop={(_, __, ref, delta, position) =>
                                                actualizarFirma(index, {
                                                    x: position.x,
                                                    y: position.y,
                                                    width: ref.offsetWidth,
                                                    height: ref.offsetHeight,
                                                })
                                            }
                                            style={{
                                                border: '3px solid #1976d2',
                                                background: 'rgba(255,255,255,0.4)',
                                                borderRadius: '8px',
                                                zIndex: 10,
                                                cursor: 'move',
                                                userSelect: 'none',
                                                touchAction: 'none',
                                                position: 'absolute',
                                            }}
                                        >
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    eliminarFirma(index);
                                                }}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    backgroundColor: 'red',
                                                    color: 'white',
                                                    '&:hover': { backgroundColor: '#d32f2f' },
                                                    zIndex: 20,
                                                }}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                            <img
                                                src={firma.firmaURL}
                                                alt="Firma"
                                                style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                                            />
                                        </Rnd>
                                    ))}
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    mt: 3,
                                    textAlign: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handleGuardarPdfFirmado}
                                    sx={{
                                        bgcolor: '#005799',
                                        '&:hover': { bgcolor: '#004c87' },
                                        px: 3,
                                        py: 1.2,
                                        fontSize: { xs: '0.9rem', sm: '1rem' },
                                        borderRadius: 2,
                                        boxShadow: 2,
                                        textTransform: 'none',
                                    }}
                                >
                                    Firmar
                                </Button>

                                {firmaDibujada && (
                                    <Button
                                        variant="contained"
                                        sx={{
                                            bgcolor: '#005799',
                                            '&:hover': { bgcolor: '#004c87' },
                                            px: 3,
                                            py: 1.2,
                                            fontSize: { xs: '0.9rem', sm: '1rem' },
                                            borderRadius: 2,
                                            boxShadow: 2,
                                            textTransform: 'none',
                                        }}
                                        onClick={() => agregarFirmaAPagina(firmaDibujada)}
                                    >
                                        Agregar firma a la página {pageNumber}
                                    </Button>
                                )}
                            </Box>

                        </>
                    )}
                </Box>
            </Paper>
        </Container>
    );
}
