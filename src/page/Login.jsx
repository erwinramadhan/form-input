import { Typography, Stack, TextField } from "@mui/material"
import MainLayout from "../layout/MainLayout"
import { useNavigate } from "react-router-dom"
import BaseButton from "../component/BaseButton"
import loginService from "../service/loginService"
import { useEffect, useMemo, useState } from "react"
import CoreModal from "../component/Modal"

const Login = () => {
    const navigation = useNavigate()
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [openErrorLogin, setOpenErrorLogin] = useState(false)

    const onLogin = async () => {
        try {
            const result = await loginService(identifier, password)
            // localStorage.setItem('items', JSON.stringify(items));
            const jwt = result.data.jwt
            const user = result.data.user

            localStorage.setItem('token', JSON.stringify(jwt));
            localStorage.setItem('user', JSON.stringify(user));
            navigation('/input')
        } catch (error) {
            setOpenErrorLogin(true)
            console.log('error', error)
        }
    }

    const submitDisabled = useMemo(() => {
        return (identifier === '' | password === '') ? true : false
    }, [identifier, password])

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if (!!jwt) {
            navigation('/input')
        }
    }, [])

    return (
        <>
            <MainLayout withoutNavBar>
                <Stack spacing={6} sx={{ color: 'black', pt: 4 }}>
                    <Stack spacing={2}>
                        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: '#575DFB', }}>
                            Login
                        </Typography>
                        <Typography sx={{ width: '90%' }}>
                            Login sekarang dan lakukan penginputan data atau melihat data yang sudah kamu inputkan ke database.
                        </Typography>
                    </Stack>
                    <Stack spacing={2}>
                        <Stack spacing={1}>
                            <Typography sx={{ fontWeight: '600' }}>
                                Username
                            </Typography>
                            <TextField id="outlined-basic" label="" variant="outlined" size="small" onChange={(e) => setIdentifier(e.target.value)} />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography sx={{ fontWeight: '600' }}>
                                Password
                            </Typography>
                            <TextField id="outlined-basic" label="" variant="outlined" type="password" size="small" onChange={(e) => setPassword(e.target.value)} />
                        </Stack>
                    </Stack>
                    <div className="flex flex-col gap-3">
                        <BaseButton text="Login" onClick={onLogin} disable={submitDisabled} />
                        <Typography sx={{ fontWeight: '600', textAlign: 'center' }}>
                            Atau
                        </Typography>
                        <div className={`rounded-xl bg-white cursor-pointer text-sm text-black font-bold py-4 px-4 text-center`} onClick={() => { navigation('/register')}}>
                            Daftar
                        </div>
                    </div>
                </Stack>
            </MainLayout>
            <CoreModal open={openErrorLogin} handleClose={() => setOpenErrorLogin(false)} title="No Handphone atau Password yang anda masukan salah." message="Lalu pastikan anda terkoneksi internet" cancelText="Login Kembali" usingAlert />
        </>
    )
}

export default Login