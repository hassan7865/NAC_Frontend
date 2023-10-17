import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PaperComp({items,handleDelete}) {
  function getDate(timestamps){
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const date = new Date(timestamps)
    const month =  months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    return (`${month} ${day},${year}`)
  }
  return (
    <Card sx={{marginBottom:"15px",width:"300px",border:"solid",borderColor:"gray",borderWidth:"0.1px"}}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <DeleteIcon  onClick={()=>handleDelete(items._id)} style={{color:"red"}}/>
          </IconButton>
        }
        subheader={getDate(items.createdAt)}
      />
      <Avatar sx={{height:"200px",width:"300px",borderRadius:"0px",objectFit:"cover"}} src={items.imgUrl}></Avatar>
      <CardContent>
        <Typography variant="h6" color="text.secondary">
        {items.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
