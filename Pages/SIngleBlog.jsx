import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Req } from "../src/Url";
import Loader from "../Loader/loader";
export default function SingleBlog() {
    const [blog,setblog] = useState(null)
    const location = useLocation()
    const type = location.pathname.split("/")[2]
    const title = location.pathname.split("/")[3]
    var decodedString = decodeURIComponent(title);
    const getBlog = async()=>{
        await Req.get(`/blog/${type}/${decodedString}`)
        .then((res)=>{
            if(res.status === 200){
                setblog(res.data[0])
            }
        })
    }
    useEffect(()=>{
        getBlog()
    },[])
    let html;
    if(blog){
        html = blog.content
    }
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <>
        {blog ? 
        <Container maxWidth="xl" sx={{ marginTop: isSmallScreen ? "80px" : "100px", display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Box sx={{ width: isSmallScreen ? "100%" : "70%"}}>
               {blog && parse(html)}
            </Box>
        </Container>:<Loader/>}
        </>
    )
}