import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
export default function TestComp({items,handleDelete}){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    return(
        <Box sx={{height:"100px",width:isSmallScreen ? "100%":"80%",display:"flex",alignItems:"center",justifyContent:"space-between",border:"0.5px solid gray",borderRadius:"10px",marginTop:"15px",paddingX:"10px"}}>
            <Box sx={{display:"flex",alignItems:"center",gap:"5px"}}>
                <DescriptionIcon/>
                <Typography variant="body1">{items.title}</Typography>
            </Box>
            <Box sx={{display:"flex",alignItems:"center",gap:"10px"}}>
                <div ><a style={{display:"flex",alignItems:"center"}} href={items.link}><VisibilityIcon sx={{color:"green"}}/></a></div>
                <DeleteIcon onClick={()=>handleDelete(items._id)} sx={{color:"red"}}/>
            </Box>
        </Box>
    )
}