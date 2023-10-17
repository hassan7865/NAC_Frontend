import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Slide from '@mui/material/Slide';
import { Box, CircularProgress, Container, CssBaseline, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import CircularWithValueLabel from './CircularProgress';
import { Req } from '../src/Url';
import { forwardRef, useState } from 'react';
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddFaqs({ open, setOpen , Notify , getFaq}) {
    const [question, setQuestion] = useState()
    const [answer, setAnswer] = useState()
    const [loading,setloading] = useState(false)
    const handleClose = () => {
        setOpen(false);
        EmptyForm();
    };
    const EmptyForm=()=>{
        setQuestion();setAnswer();
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true)
        await Req.post("/faq/createfaq", { question, answer })
            .then((res) => {
                if (res.status === 200) {
                    setloading(false)
                    Notify()
                    getFaq()
                        .then(() => {
                            handleClose()
                        })

                }
            }).catch((err) => {
                console.log(err)
                setloading(false)
            })
    }
    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Add Faq
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div style={{ height: "100vh", width: "100vw" }}>
                    <Container component="main" maxWidth="xs" sx={{
                        height: "80%", display: 'flex',
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }} >
                        <CssBaseline />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: "100%"
                            }}
                        >
                            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="outlined-required"
                                        label="Question"
                                        onChange={(e)=>setQuestion(e.target.value)}
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="outlined-required"
                                        label="Answer"
                                        onChange={(e)=>setAnswer(e.target.value)}
                                        autoFocus
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        size='medium'
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        {loading ? <CircularProgress size="25px" sx={{color:"white",}}/>:"Add Faq"}
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Container>
                </div>
            </Dialog>
        </div>
    );
}