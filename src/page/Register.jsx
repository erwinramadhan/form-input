import { Typography, Stack, TextField } from "@mui/material"
import MainLayout from "../layout/MainLayout"
import { useNavigate } from "react-router-dom"
import BaseButton from "../component/BaseButton"
import { useEffect, useMemo, useState } from "react"
import CoreModal from "../component/Modal"
import Select from 'react-select'
import getAllTeams from "../service/teamService"
import postRegister from "../service/registerService"

const DEFAULT_ROLE_ID_SURVEYOR = 3

const Register = () => {
    const navigation = useNavigate()
    const [isOpenModalError, setIsOpenModalError] = useState(false)
    const [teamDatas, setTeamDatas] = useState([])
    const [selectedTeam, setSelectedTeam] = useState({
        id: 0,
        label: '',
        secretCode: ''
    })
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        fullName: '',
        team: null,
        secretCode: '',
        role: DEFAULT_ROLE_ID_SURVEYOR
    })

    const onChangeTextField = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    const onChangeTeamSelect = (selected) => {
        setSelectedTeam(selected)
        setFormData((prev) => ({
            ...prev,
            team: selected.value
        }))
    }

    const onButtonRegister = () => {
        if (validationSecretCode()) {
            register()
            return
        }
        appearingModalError()
    }

    const appearingModalError = () => {
        setIsOpenModalError(true)
    }

    const onCloseModalError = () => {
        setIsOpenModalError(false)
    }

    const validationSecretCode = () => {
        return formData.secretCode === selectedTeam.secretCode
    }

    const getTeams = async () => {
        try {
            const { data } = await getAllTeams()
            const mappedData = data.map(el => ({
                value: el.id,
                label: el.attributes.name,
                secretCode: el.attributes.secretCode
            }))

            setTeamDatas(mappedData)
        } catch (err) {

        }
    }

    const register = async () => {
        try {
            let body = formData
            delete body.secretCode

            const data = await postRegister(body)
            navigation('/')
        } catch (err) {

        }
    }

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if (!!jwt) {
            navigation('/input')
        } else {
            getTeams()
        }
    }, [])

    return (
        <>
            <MainLayout withoutNavBar>
                <Stack spacing={6} sx={{ color: 'black', pt: 4 }}>
                    <Stack spacing={2}>
                        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: '#575DFB', }}>
                            Pendaftaran
                        </Typography>
                        <Typography sx={{ width: '90%' }}>
                            Daftarlah sekarang dan persiapkan diri Anda untuk berkontribusi dalam penginputan data.
                        </Typography>
                    </Stack>
                    <Stack spacing={2}>
                        <Stack spacing={1}>
                            <Typography sx={{ fontWeight: '600' }}>
                                Username
                            </Typography>
                            <TextField name="username" id="outlined-basic" label="" variant="outlined" size="small" onChange={onChangeTextField} />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography sx={{ fontWeight: '600' }}>
                                Password
                            </Typography>
                            <TextField name="password" id="outlined-basic" label="" variant="outlined" type="password" size="small" onChange={onChangeTextField} />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography sx={{ fontWeight: '600' }}>
                                Email
                            </Typography>
                            <TextField name="email" id="outlined-basic" label="" variant="outlined" type="email" size="small" onChange={onChangeTextField} />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography sx={{ fontWeight: '600' }}>
                                No Handphone
                            </Typography>
                            <TextField name="phoneNumber" id="outlined-basic" label="" variant="outlined" type="text" size="small" onChange={onChangeTextField} />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography sx={{ fontWeight: '600' }}>
                                Nama Lengkap
                            </Typography>
                            <TextField name="fullName" id="outlined-basic" label="" variant="outlined" type="text" size="small" onChange={onChangeTextField} />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography sx={{ fontWeight: '600' }}>
                                Team
                            </Typography>
                            <Select
                                isSearchable
                                name="regencies"
                                options={teamDatas ?? []}
                                onChange={onChangeTeamSelect}
                                value={selectedTeam}
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography sx={{ fontWeight: '600' }}>
                                Kode Rahasia Team
                            </Typography>
                            <TextField name="secretCode" id="outlined-basic" label="" variant="outlined" type="password" size="small" onChange={onChangeTextField} />
                        </Stack>
                    </Stack>
                    <BaseButton text="Daftar" onClick={onButtonRegister} />
                </Stack>
            </MainLayout>
            <CoreModal open={isOpenModalError} handleClose={onCloseModalError} title="Kode Rahasia Team yang anda masukkan tidak sesuai dengan Team yang Anda Pilih." message="Pastikan Kode Rahasia Anda Benar" cancelText="Daftar Ulang" usingAlert />
        </>
    )
}

export default Register