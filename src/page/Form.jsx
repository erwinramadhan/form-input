import { Box, Button, Stack, TextField, MenuItem, Typography } from "@mui/material"
import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import CoreModal from "../component/Modal";
import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import BaseButton from "../component/BaseButton";

const currencies = [
    {
        value: 'Laki-Laki',
        label: 'Laki-Laki',
    },
    {
        value: 'Perempuan',
        label: 'Perempuan',
    },
];

const Form = () => {
    const [openModalSuccess, setOpenModalSuccess] = useState(false)

    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [gender, setGender] = useState()
    const [whatsapp, setWhatsapp] = useState()
    const [kecamatan, setKecamatan] = useState()
    const [dusun, setDusun] = useState()

    const [filesKTP, setFilesKTP] = useState([]);
    const [filesResponden, setFilesResponden] = useState([]);
    const [filesLokasi, setFilesLokasi] = useState([]);

    const onSubmit = () => {
        console.log('DATA:', name, age, gender, whatsapp, kecamatan, dusun, filesKTP, filesResponden, filesLokasi)
    }

    return (
        <>
            <MainLayout>
                <Stack spacing={8} sx={{ pb: 10 }}>
                    <Box sx={{ color: 'black', textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Tanggapan dan Penilaian Masyarakat Mengenai Pemilu Tahun 2024 dan Partai Politik di Kabupaten Sleman, D.I. Yogyakarta</Box>
                    <Stack spacing={2}>
                        <Stack spacing={1}>
                            <Stack direction="row">
                                <span className="text-black text-sm font-medium">Nama</span>
                                <span className="text-red-600">&nbsp;*</span>
                            </Stack>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setName(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Umur</p>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setAge(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <Stack direction="row">
                                <span className="text-black text-sm font-medium">Jenis Kelamin</span>
                                <span className="text-red-600">&nbsp;*</span>
                            </Stack>
                            <TextField
                                id="gender"
                                select
                                size="small"
                                sx={{ backgroundColor: 'white' }}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Stack>
                        <Stack spacing={1}>
                            <Stack direction="row">
                                <span className="text-black text-sm font-medium">No Whatsapp</span>
                                <span className="text-red-600">&nbsp;*</span>
                            </Stack>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setWhatsapp(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Kecamatan</p>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setKecamatan(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Dusun</p>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setDusun(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Foto KTP</p>
                            <Previews name="KTP" files={filesKTP} setFiles={setFilesKTP} />
                        </Stack>
                        <Stack spacing={1}>
                            <Stack direction="row">
                                <span className="text-black text-sm font-medium">Foto Responden</span>
                                <span className="text-red-600">&nbsp;*</span>
                            </Stack>
                            <Previews name="Responden" files={filesResponden} setFiles={setFilesResponden} />
                        </Stack>
                        <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Foto Lokasi</p>
                            <Previews name="Lokasi" files={filesLokasi} setFiles={setFilesLokasi} />
                        </Stack>
                    </Stack>

                </Stack>

                <CoreModal open={openModalSuccess} handleClose={() => { setOpenModalSuccess(false) }} title={'Berhasil Menginput Data'} message={'Data yang Anda inputkan sudah berhasil dimasukan database'} />
            </MainLayout>
            <div className="fixed bottom-20 mx-auto w-full">
                <div className="mx-auto max-w-[432px]">
                    <BaseButton text="Submit" onClick={onSubmit} />
                </div>
            </div>
        </>
    )
}

export default Form



function Previews({ name, files, setFiles }) {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            console.log('acceptedFiles', acceptedFiles)
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name} className="border rounded-md">
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <section className="container">
            {thumbs.length > 0 ?
                <aside style={thumbsContainer}>
                    {thumbs}

                    <div {...getRootProps({ className: 'dropzone' })} className="text-center py-10 text-black w-full">
                        <input {...getInputProps()} />
                        <BaseButton text="Ambil Kembali Foto" onClick={() => { }} />
                    </div>
                </aside> :
                <div {...getRootProps({ className: 'dropzone' })} className="text-center py-10 text-black border rounded-md border-[#a9abaf] bg-white">
                    <input {...getInputProps()} />
                    <p>Tambahkan Foto {name}</p>
                </div>
            }
        </section>
    );
}

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};