import { LoadingButton } from "@mui/lab"
import { Box, Typography, Stack, TextField, Button, Alert, AlertTitle } from "@mui/material"
import MainLayout from "../layout/MainLayout"
import { useNavigate, use } from "react-router-dom"
import BaseButton from "../component/BaseButton"

const Login = () => {
    const navigation = useNavigate()

    const onLogin = () => {
        navigation('/input')
    }

    return (
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
                            No Handphone
                        </Typography>
                        <TextField id="outlined-basic" label="" variant="outlined" size="small" />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography sx={{ fontWeight: '600' }}>
                            Password
                        </Typography>
                        <TextField id="outlined-basic" label="" variant="outlined" type="password" size="small" />
                    </Stack>
                </Stack>
                <BaseButton text="Login" onClick={onLogin} />
            </Stack>
        </MainLayout>
    )
}

export default Login