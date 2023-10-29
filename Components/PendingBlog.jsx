import React, { useEffect, useState } from "react";
import BlogComp from "./BlogComp";
import { Box, Container } from "@mui/material";
import { Req } from "../src/Url";
import Loader from "../Loader/loader";
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser'
export default function PendingBlog({pendBlog,getPendBlog,getApproved}) {
    const DeleteBlog = async (id) => {
        await Req.delete(`/blog/pendBlog/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    getPendBlog()
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
                DeleteBlog(id)
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
    const handleApprove = (item) => {

        Swal.fire({
            title: 'Are you sure you want to Approve Blog?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve it!'
        }).then((result) => {
            if (result.isConfirmed) {
                approveBlog(item)
                    .then(() => {
                        sendEmail(item)
                        Swal.fire(
                            'Approved!',
                            'Blog has been Approved.',
                            'success'
                        )
                    })

            }
        })
    }
    const approveBlog = async (item) => {
        await Req.post("/blog/appBlog", {
            title: item.title,
            subtitle:item.subtitle,
            imgUrl: item.imgUrl,
            authorname: item.authorname,
            authoremail: item.authoremail,
            content: item.content
        })
            .then((res) => {
                if (res.status === 200) {
                    DeleteBlog(item._id)
                    .then(()=>{
                        getApproved()
                    })
                }

            })
    }
    const sendEmail=(item)=>{
        emailjs.init("3nbIneBa4IcP2eXat")
       const serviceId = "service_8ibaqni"
       const templateId = "template_fww1g9u"
       const templateParams = {
        sendername:"NedAdmissionCell",
        to:item.authoremail,
        subject:"Approval Of Blog",
        replyto:"neduetadmissioncell@gmail.com",
        link:`https://www.nedadmissioncell.com/blogs/${item._id}/${item.title}`
    
       }
       emailjs.send(serviceId,templateId,templateParams).then(()=>{
        console.log("Email Sent")
       })
      }
    return (
        <div >
            {pendBlog ?
                <Box sx={{ marginTop: "20px", marginBottom: "50px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {pendBlog && 
                    pendBlog.length === 0?
                    <div style={{displa:"flex",alignItems:"center",justifyContent:"center",height:"50vh"}}>No Pending Blogs in DataBase</div>:
                    pendBlog.map((items) => (
                        <BlogComp handleDelete={handleDelete} handleApprove={handleApprove} Dele key={items._id} items={items} pend={true}  />
                    ))}

                </Box>
                : <Loader />}
        </div>
    )
}
