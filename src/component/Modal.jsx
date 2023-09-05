import { Alert, Box, Button, Modal, Typography } from "@mui/material"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const CoreModal = ({ open, handleClose, title, message, handleOk, cancelText = 'Cancel', usingAlert }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {!!usingAlert && <Alert severity="error">{title}</Alert>}
                {!!usingAlert === false && <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                }
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {message}
                </Typography>
                <div className="flex flex-row justify-evenly">
                    <Button sx={{ mt: 2, maxWidth: '100%' }} variant="contained" onClick={handleClose}>{cancelText}</Button>
                    {handleOk ? <Button sx={{ mt: 2, maxWidth: '100%' }} variant="contained" onClick={handleOk}>OK</Button> : null}
                </div>
            </Box>
        </Modal>
    )
}

export default CoreModal