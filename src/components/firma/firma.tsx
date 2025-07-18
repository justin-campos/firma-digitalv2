"use client";

import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";
import { Paper, Typography, Box, Stack } from "@mui/material";
import { ButtonGeneral } from "@/components/button-general/button-general";
import SignatureCanvas from "react-signature-canvas";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const Firma = forwardRef(({ onSave }: { onSave?: (dataUrl: string) => void }, ref) => {
    const [open, setOpen] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const sigCanvasRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        getSignature: () => imageURL,
        clear: () => {
            setImageURL("");
            sigCanvasRef.current?.clear();
        },
    }));

    const saveSignature = () => {
        const canvas = sigCanvasRef.current.getTrimmedCanvas();

        const ctx = canvas.getContext('2d');
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
            if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
                data[i + 3] = 0;
            }
        }

        ctx.putImageData(imgData, 0, 0);

        const dataUrl = canvas.toDataURL("image/png");
        setImageURL(dataUrl);
        setOpen(false);

        if (onSave) {
            onSave(dataUrl);
        }
    };

    return (
        <Box>
            <Typography variant="body1" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                Dibuja tu firma aquí
            </Typography>

            <Paper
                variant="outlined"
                sx={{
                    border: "2px dashed #ccc",
                    width: 600,
                    height: 400,
                    mb: 2,
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f9f9f9",
                    mx: "auto",
                }}
                onClick={() => setOpen(true)}
            >
                {imageURL ? (
                    <img
                        src={imageURL}
                        alt="Firma"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                ) : (
                    <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{
                            textAlign: 'center',
                            px: 2
                        }}
                    >
                        Haz clic para dibujar tu firma
                    </Typography>

                )}
            </Paper>

            <Popup
                open={open}
                modal
                closeOnDocumentClick={false}
                onClose={() => setOpen(false)}
                contentStyle={{
                    width: '70vw',
                    height: '70vh',
                    padding: 0,
                    borderRadius: 0,
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        height: '70vh',
                        width: '70vw',
                        display: 'flex',
                        flexDirection: 'column',
                        p: 2,
                        boxSizing: 'border-box',
                        backgroundColor: '#fff',
                    }}
                >
                    <Typography variant="h5" gutterBottom textAlign="center">
                        Firma aquí
                    </Typography>

                    <Paper
                        variant="outlined"
                        sx={{
                            flexGrow: 1,
                            border: '2px dashed #ccc',
                            position: 'relative',
                            overflow: 'hidden',
                            mb: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <SignatureCanvas
                            penColor="black"
                            ref={sigCanvasRef}
                            backgroundColor="#fff"
                            canvasProps={{
                                style: {
                                    width: '100%',
                                    height: '100%',
                                },
                            }}
                        />
                    </Paper>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        gap: 2,
                        p: 1
                    }}>
                        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                            <ButtonGeneral
                                variant="contained"
                                color="primary"
                                onClick={() => sigCanvasRef.current.clear()}
                                startIcon={<DeleteIcon/>}
                                sx={{
                                    backgroundColor: '#005799',
                                    '&:hover': {
                                        backgroundColor: '#004a85',
                                    },
                                }}
                            >
                                Limpiar
                            </ButtonGeneral>

                            <ButtonGeneral
                                variant="contained"
                                color="primary"
                                onClick={saveSignature}
                                startIcon={<SaveIcon />}
                                sx={{
                                    backgroundColor: '#005799',
                                    '&:hover': {
                                        backgroundColor: '#004a85',
                                    },
                                }}
                            >
                                Guardar
                            </ButtonGeneral>

                            <ButtonGeneral
                                variant="contained"
                                color="primary"
                                onClick={() => setOpen(false)}
                                startIcon={<CloseIcon />}
                                sx={{
                                    backgroundColor: '#005799',
                                    '&:hover': {
                                        backgroundColor: '#004a85',
                                    },
                                }}
                            >
                                Cancelar
                            </ButtonGeneral>
                        </Stack>
                    </Box>
                </Box>
            </Popup>
        </Box>
    );
});

Firma.displayName = "Firma";
export default Firma;
