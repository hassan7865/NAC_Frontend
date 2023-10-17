import { Box, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useEffect, useState } from "react";
import TestComp from "../Components/TestComp";
import AddTests from "../Components/AddTests";
import { Req } from "../src/Url";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../Loader/loader";
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
export default function Test() {
  const [open, setOpen] = useState(false)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = React.useState(0);
  const [test,settest] = useState(null)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const getTest = async () => {
    await Req.get("/test/getTest")
      .then((res) => {
        if (res.status === 200) {
          settest(res.data)
        }
      }).catch((err) => console.log(err))
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
        Deletetest(id)
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
  const Deletetest = async (id) => {
    await Req.delete(`/test/deletetest/${id}`)
      .then((res) => {
        if (res.status === 200) {
          getTest()
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getTest()
  }, [])
  const Notify = () => {
    toast('Test Added Successfully!!', {
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
  function getTestByType(type) {
    return test && test.filter((item) => item.type === type);
  }
  return (
  <>
  {test ? 
    <Box sx={{ width: '100%', marginTop: isSmallScreen ? "80px" : "100px", position: "relative" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs sx={{ display: "flex" }} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{ flex: 1 }} label="Mock" {...a11yProps(0)} />
          <Tab sx={{ flex: 1 }} label="Math" {...a11yProps(1)} />
          <Tab sx={{ flex: 1 }} label="Physcis" {...a11yProps(2)} />
          <Tab sx={{ flex: 1 }} label="Chemistry" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          {getTestByType("mock")?.map((items) => (
            <TestComp handleDelete={handleDelete} key={items._id} items={items} />
          ))}
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          {getTestByType("math")?.map((items) => (
            <TestComp handleDelete={handleDelete} key={items._id} items={items} />
          ))}
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          {getTestByType("physics")?.map((items) => (
            <TestComp handleDelete={handleDelete} key={items._id} items={items} />
          ))}
        </Box>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          {getTestByType("chemistry")?.map((items) => (
            <TestComp handleDelete={handleDelete} key={items._id} items={items} />
          ))}
        </Box>

      </CustomTabPanel>
      <div onClick={handleOpen} style={{
        height: "50px",
        width: "50px",
        borderRadius: "50%",
        backgroundColor: "#1976d2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        position: "fixed",
        zIndex: "99",
        bottom: "20%",
        right: "5%"
      }}>
        <AddIcon />
      </div>
      <AddTests open={open} setOpen={setOpen} Notify={Notify} getTest={getTest} />
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
    </Box>
:<Loader/>}
    </>
  )
}