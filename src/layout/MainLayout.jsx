import { Box } from "@mui/material"
import { red } from "@mui/material/colors"
import NavigationBar from "../component/NavigationBar"

const MainLayout = ({ children, withoutNavBar, withoutPadding }) => {
    return (
        <Box sx={{ backgroundColor: 'white', width: '100vw', height: '100vh' }}>
            <Box maxWidth={480} color={red} sx={{ backgroundColor: '#F5F6F7', marginRight: 'auto', marginLeft: 'auto', color: 'white', height: '100vh', overflowY: 'scroll' }} >
                <Box sx={{ padding: withoutPadding ? '0px' : '24px', paddingBottom: withoutNavBar ? '24px' : '64px' }}>
                    {children}
                    {withoutNavBar ? null : <NavigationBar />}
                </Box>
            </Box>
        </Box>
    )
}

export default MainLayout