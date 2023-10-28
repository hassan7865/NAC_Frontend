import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, CircularProgress, Container, CssBaseline, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { forwardRef, useState } from 'react';
import { Req } from '../src/Url';
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTests({ open, setOpen,Notify,getTest}) {
    const [title, settitle] = useState()
    const [link, setlink] = useState()
    const [type, settype] = useState("mock")
    const [loading,setloading] = useState(false)
    const EmptyForm =()=>{
        settitle();setlink();settype();
    }
    const handleClose = () => {
        setOpen(false);
        EmptyForm()
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true)
        await Req.post("/test/createtest", { title, link, type })
          .then((res) => {
            if (res.status === 200) {
                setloading(false)
              Notify()
              getTest()
                .then(() => {
                  setOpen(false)
                })
    
            }
          }).catch((err) => {
            setloading(false)
            console.log(err)
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
                            Add Test
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
                                        label="Title"
                                        autoFocus
                                        onChange={(e)=>settitle(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="outlined-required"
                                        label="Link"
                                        autoFocus
                                        onChange={(e)=>setlink(e.target.value)}
                                    />
                                    <FormControl fullWidth sx={{mt:2}}>
                                        <InputLabel id="demo-simple-select-label">Test Type</InputLabel>
                                        <Select
                                        onChange={(e)=>settype(e.target.value)}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Test Type"
                                            value={type}
                                        >
                                            <MenuItem value="mock">Mock</MenuItem>
                                            <MenuItem value="chemistry" >Chemistry</MenuItem>
                                            <MenuItem value="physics" >Physics</MenuItem>
                                            <MenuItem value="math" >Maths</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        size='medium'
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                       {loading ? <CircularProgress size="25px" sx={{color:"white",}}/>:"Add Test"}
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