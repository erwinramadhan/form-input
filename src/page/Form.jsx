import { Box, Stack, TextField, MenuItem } from "@mui/material"
import Select from 'react-select'
import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import CoreModal from "../component/Modal";
import MainLayout from "../layout/MainLayout";
import BaseButton from "../component/BaseButton";
import uploadService from "../service/uploadService";
import formService from "../service/formService";
import { useNavigate } from "react-router-dom";
import Photo from "../assets/H_Totok_D.jpeg"
import LoadingAbsolute from "../component/LoadingAbsolute";
import SelectKabupaten from "../component/SelectKabupaten";
import { makeGetRegenciesRequest } from "../service/regenciesService"
import { makeGetDistrictsRequest } from "../service/districtsService";
import { createWhatsappUrl } from "../helper/createWhatsappUrl";
import ModalCamera from "../component/ModalCamera";
import dataUriToFile from "../helper/dataUriToFile";

const EDUCATION = {
    SD: 'SD',
    SMP: 'SMP',
    SMA: 'SMA',
    S1: 'S1',
    S2: 'S2',
    S3: 'S3'
}

const TOTOK_DARYANTO_CENTER = "6282242022078"

const EDUCATION_LIST_SELECT = [
    { value: EDUCATION.S1, label: EDUCATION.S1 },
    { value: EDUCATION.S2, label: EDUCATION.S2 },
    { value: EDUCATION.S3, label: EDUCATION.S3 },
    { value: EDUCATION.SD, label: EDUCATION.SD },
    { value: EDUCATION.SMP, label: EDUCATION.SMP },
    { value: EDUCATION.SMA, label: EDUCATION.SMA }
]

const ISSUES = {
    Korupsi: 'Korupsi',
    Ekonomi: 'Ekonomi',
    Sosial: 'Sosial',
    EtnisDanAgama: 'Etnis dan Agama',
    Lingkungan: 'Lingkungan',
    KonflikInternasional: 'Konflik Internasional',
    HakAsasiManusia: 'Hak Asasi Manusia',
    KeamananNasional: 'Keamanan Nasional',
    Kesehatan: 'Kesehatan',
    Pengangguran: 'Pengangguran',
    KesejahteraanSosial: 'Kesejahteraan Sosial'
}

const ISSUES_LIST_SELECT = [
    { value: ISSUES.Ekonomi, label: ISSUES.Ekonomi },
    { value: ISSUES.EtnisDanAgama, label: ISSUES.EtnisDanAgama },
    { value: ISSUES.HakAsasiManusia, label: ISSUES.HakAsasiManusia },
    { value: ISSUES.KeamananNasional, label: ISSUES.KeamananNasional },
    { value: ISSUES.Kesehatan, label: ISSUES.Kesehatan },
    { value: ISSUES.KesejahteraanSosial, label: ISSUES.KesejahteraanSosial },
    { value: ISSUES.KonflikInternasional, label: ISSUES.KonflikInternasional },
    { value: ISSUES.Korupsi, label: ISSUES.Korupsi },
    { value: ISSUES.Lingkungan, label: ISSUES.Lingkungan },
    { value: ISSUES.Pengangguran, label: ISSUES.Pengangguran },
    { value: ISSUES.Sosial, label: ISSUES.Sosial },
]

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
    const [nik, setNik] = useState(null)
    const [gender, setGender] = useState(null)
    const [whatsapp, setWhatsapp] = useState(null)
    const [kecamatan, setKecamatan] = useState(null)
    const [dusun, setDusun] = useState(null)
    const [kabupaten, setKabupaten] = useState(null)
    const [kelurahan, setKelurahan] = useState(null)
    const [rt_rw, setRTRW] = useState(null)
    const [rt, setRT] = useState(null)
    const [rw, setRW] = useState(null)
    const [issues, setIssues] = useState(null)
    const [education, setEducation] = useState(null)
    const [userId, setUserId] = useState(null)
    const [keterangan, setKeterangan] = useState(null)
    const [isLoadingRegencies, setIsLoadingRegencies] = useState(false)
    const [isLoadingDistricts, setIsLoadingDistricts] = useState(false)
    const [regencies, setRegencies] = useState([])
    const [districts, setDistricts] = useState([])
    const [selectedRegency, setSelectedRegency] = useState()
    const [selectedDistrict, setSelectedDistrict] = useState()
    const [isOpenModalCamera, setIsOpenModalCamera] = useState(false)

    const [location, setLocation] = useState(null);

    const [loading, setLoading] = useState(false)


    // const [filesKTP, setFilesKTP] = useState([]);
    const [filesResponden, setFilesResponden] = useState();
    // const [filesLokasi, setFilesLokasi] = useState([]);

    const navigation = useNavigate()

    const toggleLoadingRegencies = () => setIsLoadingRegencies(prev => !prev)
    const toggleLoadingDistricts = () => setIsLoadingDistricts(prev => !prev)

    const getRegencies = async () => {
        try {
            toggleLoadingRegencies()
            const result = await makeGetRegenciesRequest()
            const tempRegencies = result.map((el) => ({
                label: el.name,
                value: el.id
            }))
            setRegencies(tempRegencies)
            toggleLoadingRegencies()
        } catch (err) {
            toggleLoadingRegencies()
        }
    }

    const getDistricts = async (id) => {
        try {
            toggleLoadingDistricts()
            const result = await makeGetDistrictsRequest(id)
            const tempDistricts = result.map((el) => ({
                label: el.name,
                value: el.id
            }))
            setDistricts(tempDistricts)
            toggleLoadingDistricts()
        } catch (err) {
            toggleLoadingDistricts()
        }
    }

    const onChangeSelectRegency = (newValue) => {
        setSelectedDistrict(undefined)
        setKecamatan(null)
        setSelectedRegency(newValue)
        getDistricts(newValue.value)
        setKabupaten(newValue.label)
    }

    const onChangeSelectDistrict = (newValue) => {
        setSelectedDistrict(newValue)
        setKecamatan(newValue.label)
    }

    const onChangeSelectIssue = (newValue) => {
        setIssues(newValue.value)
    }

    const onChangeSelectEducation = (newValue) => {
        setEducation(newValue.value)
    }

    useEffect(() => {
        getRegencies()
    }, [])

    const openNewTabWhatsapp = () => {
        const phoneCenter = TOTOK_DARYANTO_CENTER
        const userobj = localStorage.getItem('user')
        const parsedUserObj = JSON.parse(userobj);
        
        const messageVoterOnUrl = `Halo Bapak Totok Daryanto, saya ${name} dari RT. ${rt} RW. ${rw} Kelurahan ${kelurahan} Kecamatan ${kecamatan} Kabupaten ${kabupaten}. Siap mendukung Bapak Totok untuk menjadi DPR RI Yogyakarta. 
        
#TDSukses2024
        `

        const encodedVoterMessage = encodeURIComponent(messageVoterOnUrl)

        const message = `Salam Sukses #TDSukses2024

Halo ${name}, ini adalah pesan Whatsapp dari ${parsedUserObj.fullName}. Untuk mengkonfirmasi bahwa ${name} mendukung Bapak Totok Daryanto menjadi DPR RI, silahkan mengkonfirmasi dengan menghubungi ke nomor Resmi Totok Daryanto Center ${phoneCenter} dengan mengklik link berikut :

https://wa.me/${phoneCenter}/?text=${encodedVoterMessage}
        
Mohon bantuannya dan mari ikut berperan aktif dengan mengikuti akun Sosial Media resmi Bapak Totok Daryanto :
- Facebook : https://www.facebook.com/totokdaryantocenter/
- Instagram : http://instagram.com/totok.daryanto/
- Twitter : https://twitter.com/totokdaryanto
        
Terimakasih atas partisipasi ${name}.
`

        const encodedMessage = encodeURIComponent(message)

        const encodedUrl = createWhatsappUrl(encodedMessage, whatsapp)

        window.open(encodedUrl, '_blank');
    }

    const onSubmit = async () => {
        setLoading(true)
        const surveyor_username = localStorage.getItem('user')
        const parsedItem = JSON.parse(surveyor_username);
        try {
            let idPhoto = null

            if (filesResponden) {
                try {
                    const timestamp = Date.now();
                    const file = dataUriToFile(filesResponden, `survey_${name}_${age}_${timestamp}.png`);

                    const resultImage = await uploadService([file])

                    const data = {
                        data: {
                            name,
                            gender,
                            whatsapp,
                            province: 'Daerah Istimewa Yogyakarta',
                            regency: kabupaten,
                            district: kecamatan,
                            subdistrict: kelurahan,
                            dusun,
                            rt,
                            rw,
                            description: keterangan,
                            issues,
                            education,
                            age,
                            photo: resultImage.data[0].id,
                            latitude: location?.latitude,
                            longitude: location?.longitude,
                            users_permissions_user: parsedItem.id
                        }
                    }

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
                        name,
                        gender,
                        whatsapp,
                        province: 'Daerah Istimewa Yogyakarta',
                        regency: kabupaten,
                        district: kecamatan,
                        subdistrict: kelurahan,
                        dusun,
                        rt,
                        rw,
                        description: keterangan,
                        issues,
                        education,
                        age,
                        photo: idPhoto,
                        latitude: location?.latitude,
                        longitude: location?.longitude,
                        users_permissions_user: parsedItem.id
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
            return
        }

        setCurrentLocation()
    }, [])

    const setCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude: `${latitude}`, longitude: `${longitude}` });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude} type: ${typeof latitude}`);
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

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
                            <p className="font-bold mb-2">H TOTOK DARYANTO , SE</p>
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
                        {/* <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">NIK</p>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setNik(e.target.value)} />
                        </Stack> */}
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
                            <p className="text-black text-sm font-medium">Pendidikan</p>
                            <Select
                                isSearchable
                                name="isues"
                                options={EDUCATION_LIST_SELECT ?? []}
                                onChange={onChangeSelectEducation}
                                className="text-black"
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <Stack direction="row">
                                <span className="text-black text-sm font-medium">No Whatsapp</span>
                            </Stack>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setWhatsapp(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Kabupaten</p>
                            {/* <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setKabupaten(e.target.value)} /> */}
                            {/* <SelectKabupaten onChange={(e) => setKabupaten(e.value)} /> */}
                            <Select
                                isSearchable
                                name="regencies"
                                options={regencies ?? []}
                                onChange={onChangeSelectRegency}
                                isLoading={isLoadingRegencies}
                                isDisabled={regencies.length === 0}
                                value={selectedRegency}
                                className="text-black"
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Kecamatan</p>
                            {/* <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setKecamatan(e.target.value)} /> */}
                            <Select
                                isSearchable
                                name="districts"
                                options={districts ?? []}
                                onChange={onChangeSelectDistrict}
                                isLoading={isLoadingDistricts}
                                isDisabled={districts.length === 0}
                                value={selectedDistrict}
                                className="text-black"
                            />
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
                            <p className="text-black text-sm font-medium">RT</p>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setRT(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">RW</p>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} onChange={(e) => setRW(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Isu</p>
                            <Select
                                isSearchable
                                name="isues"
                                options={ISSUES_LIST_SELECT ?? []}
                                onChange={onChangeSelectIssue}
                                className="text-black"
                            />
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
                            {filesResponden ? <img src={filesResponden} alt="Gambar yang diambil" /> : null}
                            {/* <Previews name="Responden" files={filesResponden} setFiles={setFilesResponden} /> */}
                            <BaseButton text="CAMERA!" onClick={() => setIsOpenModalCamera(true)}></BaseButton>
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
                    openNewTabWhatsapp()
                }} title={'Berhasil Menginput Data'} message={'Data yang Anda inputkan sudah berhasil dimasukan database'}
                    cancelText="OK"
                />
                <ModalCamera
                photo={filesResponden}
                setPhoto={setFilesResponden}
                    isOpen={isOpenModalCamera}
                    onClose={() => setIsOpenModalCamera(false)}
                />
            </MainLayout>
            <div className="fixed bottom-20 mx-auto w-full">
                <div className="mx-auto max-w-[432px]">
                    <BaseButton text="Submit" onClick={onSubmit} disable={name === null || name === ''} />
                </div>
            </div>
            <LoadingAbsolute loading={loading} />

        </>
    )
}

export default Form



export function Previews({ name, files, setFiles, isEdit, imgUrl }) {
    console.log('files', files)
    const shouldBeUsingImgURL = files.length === 0 && imgUrl && isEdit

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

    const thumbs = shouldBeUsingImgURL
        ? <div style={thumb} className="border rounded-md">
            <div style={thumbInner}>
                <img
                    src={imgUrl}
                    style={img}
                // Revoke data uri after image is loaded
                // onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
        : files.map(file => (
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
            {files.length > 0 || (isEdit && imgUrl) ?
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