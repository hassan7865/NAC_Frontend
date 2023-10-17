import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useDispatch} from 'react-redux'
import Container from '@mui/material/Container';
import { Alert, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { useState } from 'react';
import { Req } from '../src/Url';
import { LoginFailure, LoginStart, LoginSuccess } from '../Redux/LoginRedux';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username,setusername] = useState()
    const [password,setpassword] = useState()
    const [error,seterror] = useState(false)
    const [loading,setloading] = useState(false)
    const dispatch = useDispatch()
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleSubmit =async(e) => {
        e.preventDefault()
        setloading(true)
        dispatch(LoginStart())
        await Req.post("/auth/signin",{username,password})
        .then((res)=>{
            if(res.status === 200){
                dispatch(LoginSuccess(res.data))
                setloading(false)
            }
        }).catch((err)=>{
            dispatch(LoginFailure(err))
            setloading(false)
            seterror(true)
        })
    }
    return (
        <div style={{height:"100vh"}}>
        <Container component="main" maxWidth="xs" sx={{height:"80%" , display: 'flex',
                    alignItems: 'center',}} >
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar src='https://www.nedadmissioncell.com/NED.png' sx={{height:"100px",width:"100px",objectFit:"cover"}} >
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
               {error && <Alert sx={{marginY:"15px",width:"100%"}} variant="outlined" severity="error">Invalid Credentials!!</Alert>}
                <form onSubmit={handleSubmit}>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            onChange={(e)=>setusername(e.target.value)}
                            fullWidth
                            id="outlined-required"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <FormControl sx={{mt:3}} fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                required
                                onChange={(e)=>setpassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            size='medium'
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? <CircularProgress size="25px" sx={{color:"white",}}/>:"Sign in"}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
        </div>
    );
}