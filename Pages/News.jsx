import { Box, Button, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import React, { useEffect, useState } from "react";
import AddNews from "../Components/AddNews";
import NewsComp from "../Components/NewsComp";
import { Req } from "../src/Url";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../Loader/loader";
export default function News() {
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [news,setnews] = useState();
    const handleOpen = () => {
        setOpen(true);
      };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const getNews = async()=>{
        await Req.get("/news/getnews")
        .then((res)=>{
            if (res.status === 200){
                setnews(res.data)
            }
        })
    }
    useEffect(()=>{
        getNews()
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
                DeleteNews(id)
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
    const DeleteNews = async (id) => {
        await Req.delete(`/news/deletenews/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    getNews()
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    const Notify = () => {
        toast('News Added Successfully!!', {
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
       {news ? 
        <Container maxWidth="xl" sx={{
            marginTop: isSmallScreen ? "80px" : "100px",
        }}>
            <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <Typography variant="h4">
                    News
                </Typography>
                <Button onClick={handleOpen} size= {isSmallScreen?"small" : "medium"} variant="contained" endIcon={<NewspaperIcon />}>
                    Add
                </Button>

            </Box>
            <Box sx={{marginTop:"20px",marginBottom:"50px",display:"flex",flexDirection:"column",alignItems:"center"}}>
               {news && news.map((items)=>(
                 <NewsComp handleDelete={handleDelete} key={items._id} items={items}/>
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
            <AddNews Notify={Notify} open={open} setOpen={setOpen} getNews={getNews}/>
        </Container>
       :<Loader/>} </>
    )
}