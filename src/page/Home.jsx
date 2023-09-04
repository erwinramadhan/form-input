import { Box } from "@mui/material"
import MainLayout from "../layout/MainLayout"

const Home = () => {
    return (
        <MainLayout>
            <div className="text-black flex flex-col">
                <span>Selamat datang Paul,</span>
                <span>Kamu telah melakukan 10 kali input data</span>
            </div>
        </MainLayout>
    )
}

export default Home