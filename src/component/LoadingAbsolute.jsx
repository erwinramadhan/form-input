import { CircularProgress } from "@mui/material"

const LoadingAbsolute = ({ loading }) => {
    if (loading) {
        return (
            <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: 999 }}>
                <CircularProgress />
            </div>
        )
    }

    return null
}

export default LoadingAbsolute