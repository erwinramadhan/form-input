import { Box, Stack, TextField, MenuItem, CircularProgress } from "@mui/material"
import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import CoreModal from "../component/Modal";
import MainLayout from "../layout/MainLayout";
import BaseButton from "../component/BaseButton";
import uploadService from "../service/uploadService";
import formService from "../service/formService";
import { useNavigate } from "react-router-dom";
import Photo from "../assets/H_Totok_D.jpeg"

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

    const [name, setName] = useState(null)
    const [age, setAge] = useState(null)
    const [gender, setGender] = useState(null)
    const [whatsapp, setWhatsapp] = useState(null)
    const [kecamatan, setKecamatan] = useState(null)
    const [dusun, setDusun] = useState(null)
    const [kabupaten, setKabupaten] = useState(null)
    const [kelurahan, setKelurahan] = useState(null)
    const [rt_rw, setRTRW] = useState(null)
    const [keterangan, setKeterangan] = useState(null)

    const [loading, setLoading] = useState(false)


    // const [filesKTP, setFilesKTP] = useState([]);
    const [filesResponden, setFilesResponden] = useState([]);
    // const [filesLokasi, setFilesLokasi] = useState([]);

    const navigation = useNavigate()

    const onSubmit = async () => {
        setLoading(true)
        const surveyor_username = localStorage.getItem('user')
        const parsedItem = JSON.parse(surveyor_username);
        try {
            let idPhoto = null

            if (filesResponden.length) {
                try {
                    const resultImage = await uploadService(filesResponden)
                    console.log('resultImage', resultImage.data[0].id)

                    const data = {
                        data: {
                            nama: name,
                            gender: gender,
                            whatsapp: whatsapp,
                            kabupaten: kabupaten,
                            kecamatan: kecamatan,
                            kelurahan: kelurahan,
                            dusun: dusun,
                            rt_rw: rt_rw,
                            usia: age,
                            photo: resultImage.data[0].id,
                            keterangan: keterangan,
                            surveyor_username: parsedItem.username
                        }
                    }

                    console.log("WKKW DATA", data)
                    console.log("idPhoto", idPhoto)
                    console.log('surveyor_username', surveyor_username)

                    const result = await formService(data)
                    setLoading(false)
                    setOpenModalSuccess(true)
                } catch (error) {
                    console.log('error', error)
                    setLoading(false)
                    setOpenModalSuccess(true)
                }
            } else {
                const data = {
                    data: {
                        nama: name,
                        gender: gender,
                        whatsapp: whatsapp,
                        kabupaten: kabupaten,
                        kecamatan: kecamatan,
                        kelurahan: kelurahan,
                        dusun: dusun,
                        rt_rw: rt_rw,
                        usia: age,
                        photo: idPhoto,
                        keterangan: keterangan,
                        surveyor_username: parsedItem.username
                    }
                }

                const result = await formService(data)
                setLoading(false)
                setOpenModalSuccess(true)
            }
        } catch (error) {
            console.log('error', error)
            setLoading(false)
            setOpenModalSuccess(true)
        }
    }

    useEffect(() => {
        const tokenStorage = localStorage.getItem('token');
        const tokenParsed = JSON.parse(tokenStorage);

        if (!!tokenParsed === false) {
            navigation('/')
        }

    }, [])

    return (
        <>
            <MainLayout>
                <Stack spacing={8} sx={{ pb: 10 }}>
                    <Stack spacing={2}>
                        {/* <div className="rounded-full flex justify-center items-center">
                            <img src={Photo} className="rounded-full w-24 h-24" />
                        </div> */}
                        <Box sx={{ color: 'black', textAlign: 'center', fontWeight: 'medium', fontSize: 20 }}>
                            Siap Memilih
                            <p className="font-bold mb-2">H TOTOK DARYANYO , SE</p>
                            <div className="rounded-full flex justify-center items-center mb-2">
                                <img src={Photo} className="rounded-full w-24 h-24" />
                            </div>
                            <p className="text-yellow-500">DPR RI Dapil DIY</p>
                        </Box>
                    </Stack>
                    <Stack spacing={2}>
                        <Stack spacing={1}>
                            <Stack direction="row">
                                <span className="text-black text-sm font-medium">Nama</span>
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
                            </Stack>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setWhatsapp(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Kabupaten</p>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setKabupaten(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Kecamatan</p>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setKecamatan(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Kelurahan</p>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setKelurahan(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Dusun</p>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setDusun(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">RT/RW</p>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setRTRW(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Keterangan</p>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setKeterangan(e.target.value)} />
                        </Stack>
                        {/* <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Foto KTP</p>
                            <Previews name="KTP" files={filesKTP} setFiles={setFilesKTP} />
                        </Stack> */}
                        <Stack spacing={1}>
                            <Stack direction="row">
                                <span className="text-black text-sm font-medium">Foto Responden</span>
                            </Stack>
                            <Previews name="Responden" files={filesResponden} setFiles={setFilesResponden} />
                        </Stack>
                        {/* <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Foto Lokasi</p>
                            <Previews name="Lokasi" files={filesLokasi} setFiles={setFilesLokasi} />
                        </Stack> */}
                    </Stack>

                </Stack>

                <CoreModal open={openModalSuccess} handleClose={() => {
                    setOpenModalSuccess(false)
                    navigation('/')
                }} title={'Berhasil Menginput Data'} message={'Data yang Anda inputkan sudah berhasil dimasukan database'}
                    cancelText="OK"
                />
            </MainLayout>
            <div className="fixed bottom-20 mx-auto w-full">
                <div className="mx-auto max-w-[432px]">
                    <BaseButton text="Submit" onClick={onSubmit} disable={name === null || name === ''} />
                </div>
            </div>
            {
                loading &&
                <div className="absolute top-0 left-0 w-screen h-screen z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <CircularProgress />
                </div>
            }

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