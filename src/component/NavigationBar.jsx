// import PersonIcon from '@mui/icons-material/Person'
// import HomeIcon from '@mui/icons-material/Home'
import AssignmentIcon from '@mui/icons-material/Assignment'
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import { Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CoreModal from './Modal';
import { useState } from 'react';

const classNameActive = "font-bold text-xs text-[#1976d2]"
const classNameInActive = 'font-bold text-xs text-[#484C52]'

const NavigationBar = () => {
    const navigation = useNavigate()
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const [openLogout, setOpenLogout] = useState(false)

    // const onHome = () => {
    //     navigation('/home')
    // }

    // const onProfile = () => {
    //     navigation('/profil')
    // }

    const onForm = () => {
        navigation('/input')
    }

    const onHistory = () => {
        navigation('/riwayat')
    }

    const onLogout = () => {
        localStorage.clear()
        navigation('/')
    }

    // const isHomeActive = location.pathname === '/home' ? true : false
    const isHistoryActive = location.pathname === '/riwayat' ? true : false
    const isFormActive = location.pathname === '/input' ? true : false
    // const isProfileActive = location.pathname === '/profil' ? true : false

    return (
        <div className='fixed bottom-0 left-0 w-full z-50'>
            <div className="bg-white flex justify-evenly shadow-lg max-w-[480px] mx-auto">
                {/* <Stack spacing={1} sx={{ alignItems: 'center', py: 1, minWidth: '50px' }} onClick={onHome}>
                    <HomeIcon color={isHomeActive ? 'primary' : 'action'} />
                    <span className={isHomeActive ? classNameActive : classNameInActive}>Home</span>
                </Stack> */}
                <Stack spacing={1} sx={{ alignItems: 'center', py: 1, minWidth: '50px' }} onClick={onForm}>
                    <AssignmentIcon color={isFormActive ? 'primary' : 'action'} />
                    <span className={isFormActive ? classNameActive : classNameInActive}>Form</span>
                </Stack>
                <Stack spacing={1} sx={{ alignItems: 'center', py: 1, minWidth: '50px' }} onClick={() => setOpen(true)}>
                    <HistoryIcon color={isHistoryActive ? 'primary' : 'action'} />
                    <span className={isHistoryActive ? classNameActive : classNameInActive}>Riwayat</span>
                </Stack>
                {/* <Stack spacing={1} sx={{ alignItems: 'center', py: 1, minWidth: '50px' }} onClick={onProfile} >
                    <PersonIcon color={isProfileActive ? 'primary' : 'action'} />
                    <span className={isProfileActive ? classNameActive : classNameInActive}>Profil</span>
                </Stack> */}
                <Stack spacing={1} sx={{ alignItems: 'center', py: 1, minWidth: '50px' }} onClick={() => {setOpenLogout(true)}}>
                    <LogoutIcon color={'action'} />
                    <span className={classNameInActive}>Logout</span>
                </Stack>
                <CoreModal open={open} handleClose={() => setOpen(false)} title="Apakah anda yakin berpindah halaman?" message="Data tidak akan terkekam apabila belum di 'SUBMIT'." handleOk={onHistory} />
                <CoreModal open={openLogout} handleClose={() => setOpenLogout(false)} title="Apakah anda yakin keluar dari aplikasi?" message="Anda akan kembali kehalaman login apabila melakukan logout." handleOk={onLogout} />
            </div>
        </div>
    )
}

export default NavigationBar