import { Box, Button, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import FaqComp from "../Components/FaqComp";
import HelpIcon from '@mui/icons-material/Help';
import { useEffect, useState } from "react";
import AddFaqs from "../Components/AddFaq";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Req } from "../src/Url";
import Swal from 'sweetalert2'
import Loader from "../Loader/loader";
export default function Faqs() {
    const [open, setOpen] = useState(false)
    const [Faq, setFaq] = useState(null)
    const getFaq = async () => {
        await Req.get("/faq/getfaq")
            .then((res) => {
                if (res.status === 200) {
                    setFaq(res.data)
                }
            }).catch((err) => {
                console.log(err)
            })
    }
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
                DeleteFaq(id)
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
    const DeleteFaq = async (id) => {
        await Req.delete(`/faq/deletefaq/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    getFaq()
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getFaq()
    }, [])
    const Notify = () => {
        toast('Faq Added Successfully!!', {
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
    const handleOpen = () => {
        setOpen(true);
    };
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <>
        {Faq ? 
            <Container maxWidth="xl" sx={{
                marginTop: isSmallScreen ? "80px" : "100px",
            }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h4">
                        FAQ'S
                    </Typography>
                    <Button onClick={handleOpen} size={isSmallScreen ? "small" : "medium"} variant="contained" endIcon={<HelpIcon />}>
                        Add
                    </Button>

                </Box>
                <Box sx={{ marginTop: "30px" }}>
                    {Faq && Faq.map((items) => (
                        <FaqComp handleDelete={handleDelete} key={items._id} items={items} />
                    ))}
                </Box>
                <AddFaqs open={open} setOpen={setOpen} Notify={Notify} getFaq={getFaq}/>
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
                </Container>:<Loader/>}
                </>
            )
}