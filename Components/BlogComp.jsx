import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, useMediaQuery } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RecommendIcon from '@mui/icons-material/Recommend';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';
export default function BlogComp({ app,pend, items,handleApprove,handleDelete}) {
    const [expanded, setExpanded] = React.useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    function getDate(timestamps){
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const date = new Date(timestamps)
        const month =  months[date.getMonth()]
        const day = date.getDate()
        const year = date.getFullYear()
        return (`${month} ${day},${year}`)
      }
    return (

        <Card sx={{ width: isSmallScreen ? "100%" : "60%", marginBottom: "25px", boxShadow: "none", border: "0.5px solid gray" }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings" sx={{display:"flex",alignItems:"center",gap:"10px"}} >
                         <Link style={{ textDecoration: "none", color: "inherit",display:"flex",alignItems:"center" }} to={`/Blogs/${pend ? "pendBlog":"appBlog"}/${items?.title}`}>
                         <RemoveRedEyeIcon  style={{ color: "green" }}/>
                         </Link>
                        <DeleteIcon onClick={()=>handleDelete(items?._id)} style={{ color: "red" }} />
                    </IconButton>

                }
                title={items?.title}
                subheader={getDate(items?.createdAt)}
            />

            <Avatar sx={{ width: "100%", borderRadius: "0px", height: "100%", objectFit: "contain" }} src={items?.imgUrl}></Avatar>
            <CardContent>
               
                    <Typography variant="h6" color="text.secondary">
                        {items?.subtitle}
                    </Typography>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "20px", }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <AccountCircleIcon />
                        <Typography variant='body1'>
                            Written By {items?.authorname}
                        </Typography>
                    </div>
                    {pend && <Button onClick={()=>handleApprove(items)} size={isSmallScreen ? "small" : "medium"} variant="contained" endIcon={<RecommendIcon />}>
                        Approve
                    </Button>}
                </div>
            </CardContent>

        </Card>

    );
}
