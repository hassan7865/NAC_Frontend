import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Slide from '@mui/material/Slide';
import { Box, CircularProgress, Container, CssBaseline, Input, TextField } from '@mui/material';
import CircularWithValueLabel from './CircularProgress';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { forwardRef, useEffect, useState } from 'react';
import app from '../src/Firebase';
import { Req } from '../src/Url';
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddPapers({ open, setOpen,Notify,getPaper }) {
    const [title,settitle] = useState()
    const [img,setimg] = useState()
    const [link,setlink] = useState()
    const [imgUrl,setimgUrl] = useState()
    const [imgPerc,setimgPerc] = useState()
    const [loading,setloading] = useState(false)
    const handleClose = () => {
        setOpen(false);
        EmptyForm()
    };
    const EmptyForm=()=>{
        settitle();setimg();setimgUrl();setimgPerc();
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true)
        await Req.post("/pastpapers/createpaper", { 
            title:title,
            imgUrl:imgUrl,
            link:link
         })
            .then((res) => {
                if (res.status === 200) {
                    setloading(false)
                    Notify()
                    getPaper()
                        .then(() => {
                            handleClose()

                        })

                }
            }).catch((err) => {
                console.log(err)
                setloading(false)
            })
    }
    const UploadFile = (file) => {
        const fileName = new Date().getTime() + file?.name
        const storage = getStorage(app);
        const storageRef = ref(storage, `${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setimgPerc(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    default:
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                   setimgUrl(downloadURL)
                });
            }
        )
    }
    useEffect(()=>{img && UploadFile(img)},[img])
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
                            Add PastPapers
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div style={{ height: "100vh", width: "100vw" }}>
                    <Container component="main" maxWidth="xs" sx={{
                        height: "80%", display: 'flex',
                        width: "100%",
                        alignItems:"center",
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
                                        label="Title"
                                        autoFocus
                                        onChange={(e)=>settitle(e.target.value)}
                                    />
                                    <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            startIcon={<FileUploadOutlinedIcon />}
                                        >
                                            Upload Image
                                            <input
                                                type="file"
                                                hidden
                                                required
                                                onChange={(e)=>setimg(e.target.files[0])}
                                            />
                                        </Button>
                                       {img && <CircularWithValueLabel value={imgPerc}/>}
                                    </div>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="outlined-required"
                                        label="Link"
                                        autoFocus
                                        onChange={(e)=>setlink(e.target.value)}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        size='medium'
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        {loading ? <CircularProgress size="25px" sx={{color:"white",}}/>:"Add Paper"}
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