import { Box, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import PropTypes from 'prop-types';
import ApprovedBlog from "../Components/ApprovedBlog";
import PendingBlog from "../Components/PendingBlog";
import { useEffect, useState } from "react";
import { Req } from "../src/Url";
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
export default function Blog() {
    const [value, setValue] = useState(0);
    const [appBlog,setappBlog] = useState()
    const [pendBlog, setpenBlog] = useState()
    const getPendBlog = async () => {
        await Req.get("/blog/pendBlog")
            .then((res) => {
                if (res.status === 200) {
                    setpenBlog(res.data)
                }
            })
    }
    useEffect(() => {
        getPendBlog()
    }, [])
    const getApproved=async()=>{
        await Req.get("/blog/appBlog")
        .then((res)=>{
            if(res.status === 200){
                setappBlog(res.data)
            }
        })
    }
    useEffect(()=>{
        getApproved()
    },[])
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box sx={{ width: '100%', marginTop: isSmallScreen ? "80px" : "100px", position: "relative" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{flex:1,fontSize:"15px"}}   label="Approved" {...a11yProps(0)} />
                    <Tab sx={{flex:1,fontSize:"15px"}} label="Pending" {...a11yProps(0)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
               <ApprovedBlog appBlog={appBlog} getApproved={getApproved}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            <PendingBlog getApproved={getApproved} pendBlog={pendBlog} getPendBlog={getPendBlog}/>
            </CustomTabPanel>      
        </Box>
    )
}