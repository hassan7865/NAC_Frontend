import React, { useEffect, useState } from "react";
import BlogComp from "./BlogComp";
import { Box, Container } from "@mui/material";
import { Req } from "../src/Url";
import Swal from "sweetalert2";
import Loader from "../Loader/loader";

export default function ApprovedBlog({appBlog,getApproved}) {
    
    const deleteApprove = async(id)=>{
        await Req.delete(`/blog/appBlog/${id}`)
        .then((res)=>{
            if(res.status === 200){
                getApproved()
            }
        })
    }
    const handleDelete = (id) => {
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
                deleteApprove(id)
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
    return (
        <div >
            {appBlog ?
            <Box sx={{marginTop:"20px",marginBottom:"50px",display:"flex",flexDirection:"column",alignItems:"center"}}>
                {appBlog && 
                appBlog.length === 0?
                <div style={{displa:"flex",alignItems:"center",justifyContent:"center",height:"50vh"}}>No Approved Blogs in DataBase</div>:
                appBlog.map((items)=>(
                    <BlogComp handleDelete={handleDelete} key={items._id} items={items}  app={true} />
                ))}
            </Box>
:<Loader/>}
        </div>
    )
}