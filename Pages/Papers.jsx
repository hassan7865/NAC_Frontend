import { Box, Button, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddPapers from "../Components/AddPapers";
import ArticleIcon from '@mui/icons-material/Article';
import PaperComp from "../Components/PaperComp";
import { Req } from "../src/Url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import Loader from "../Loader/loader";
export default function Papers() {
    const [open, setOpen] = React.useState(false);
    const [paper,setpaper] = useState()
    const handleOpen = () => {
        setOpen(true);
      };
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const getPaper = async () => {
        await Req.get("/pastpapers/getpaper")
            .then((res) => {
                if (res.status === 200) {
                    setpaper(res.data)
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    useEffect(()=>{
        getPaper()
    },[])
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                DeletePapers(id)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    })

            }
        })
    }
    const DeletePapers = async (id) => {
        await Req.delete(`/pastpapers//deletepaper/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    getPaper()
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    const Notify = () => {
        toast('Past Papers Added Successfully!!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    return (
        <>
        {paper ? <Container maxWidth="xl" sx={{
            marginTop: isSmallScreen ? "80px" : "100px",
        }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h4">
                    Past Papers
                </Typography>
                <Button onClick={handleOpen} size={isSmallScreen ? "small" : "medium"} variant="contained" endIcon={<ArticleIcon/>}>
                    Add
                </Button>
            </Box>
            <Box sx={{display:"flex",alignItems:"center",gap:"20px",flexWrap:"wrap",justifyContent:"center",marginTop:"50px"}}>
                {paper && paper.map((items)=>(
                    <PaperComp handleDelete={handleDelete} items={items} key={items._id}/>
                ))}
                
            </Box>
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            <AddPapers Notify={Notify} getPaper={getPaper} open={open} setOpen={setOpen}/>
        </Container>
:<Loader/>}</>
    )
}