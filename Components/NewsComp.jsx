import { styled, useTheme } from '@mui/material/styles';
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
import { Box, Button, useMediaQuery } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LinkIcon from '@mui/icons-material/Link';
import { useState } from 'react';
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

export default function NewsComp({items,handleDelete}) {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  function getDate(timestamps){
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const date = new Date(timestamps)
    const month =  months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    return (`${month} ${day},${year}`)
  }
  console.log()
  return (
    <Card sx={{width:isSmallScreen?"90%":"60%",marginBottom:"15px",boxShadow:"none",border:"0.5px solid gray",paddingX:"20px"}}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <DeleteIcon onClick={()=>handleDelete(items._id)}  style={{color:"red"}}/>
          </IconButton>
        }
        subheader={getDate(items.createdAt)}
      />
      <Avatar sx={{width:"100%",borderRadius:"0px",height:"100%",objectFit:"contain"}} src={items.imgUrl}></Avatar>
      <CardContent>
        <Typography variant="h5" color="text.secondary">
       {items.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
         <Typography>
          {items.desc}
         </Typography>
         <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"15px"}}>
          {items.file && <Button  href={items.file} variant="contained" endIcon={<AttachFileIcon/>}>File</Button>}
          <Button href={items.link} variant='outlined' endIcon={<LinkIcon/>}>Link</Button>
         </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
