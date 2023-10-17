import { Container, useTheme, useMediaQuery, Button } from '@mui/material';
import Chart from './Chart';
import Line from './Line';
import { useEffect, useState } from 'react';
import { Req } from '../src/Url';
import Loader from '../Loader/loader';


export default function Overview() {
  const [data, setdata] = useState()
  const [count, setcount] = useState()
  useEffect(() => {
    const getBlogData = async () => {
      await Req.get("/blog/Stats")
        .then((res) => {
          if (res.status === 200) {
            setdata(res.data)
          }
        })
    }
    getBlogData();
  }, [])
  useEffect(() => {
    const getCount = async () => {
      await Req.get("/Count")
        .then((res) => {
          if (res.status === 200) {
            setcount(res.data)
          }
        })
    }
    getCount()
  }, [])
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
    {data && count ? 
    <Container maxWidth="xl"
      style={{
        alignItems: "center",
        marginTop: isSmallScreen ? "80px" : "50px",
        display: "flex",
        flexDirection: isSmallScreen && "column",
        height: !isSmallScreen && "80vh"
      }}>
      <Chart count={count} isSmallScreen={isSmallScreen} />
      <Line data={data} isSmallScreen={isSmallScreen} />
    </Container>
:<Loader/>}</>
  );
}
