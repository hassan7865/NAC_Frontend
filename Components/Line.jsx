import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"

export default function Line({isSmallScreen,data}){
  const [monthsData,setmonthsData] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  useEffect(()=>{
    if(data){
      const newData = [...monthsData]
      for (let i = 0; i < data.length; i++) {
       if(data[i]._id === 1){
        newData[0]= data[i].count
       } 
       else if(data[i]._id === 2){
        newData[1]= data[i].count
       } 
       else if(data[i]._id === 3){
        newData[2]= data[i].count
       } 
       else if(data[i]._id === 4){
        newData[3]= data[i].count
       } 
       else if(data[i]._id === 5){
        newData[4]= data[i].count
       } 
       else if(data[i]._id === 6){
        newData[5]= data[i].count
       } 
       else if(data[i]._id === 7){
        newData[6]= data[i].count
       } 
       else if(data[i]._id === 8){
        newData[7]= data[i].count
       } 
       else if(data[i]._id === 9){
        newData[8]= data[i].count
       }
       else if(data[i]._id === 10){
        newData[9]= data[i].count
       } 
       else if(data[i]._id === 11){
        newData[10]= data[i].count
       } 
       else if(data[i]._id === 12){
        newData[11]= data[i].count
       }
      }
      setmonthsData(newData)
    }
  },[data])
    const state = {
        series: [{
            name: "Blogs Per Months",
            data: monthsData
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Blogs Posting Per Month',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'],
          }
        },
      }
    return(
        <ReactApexChart options={state.options} series={state.series} type="line"  width={isSmallScreen ? 350:500} height={isSmallScreen ? 250:350} />    
    )
}