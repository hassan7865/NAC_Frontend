import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
export default function Chart({isSmallScreen,count}){
  const [numcount,setnumcount] = useState([0,0,0,0])
  useEffect(()=>{
    if(count){
      const newData = [...numcount]
      newData[0] = count.news[0]?.total
      newData[1] = count.test[0]?.total
      newData[2] = count.Faq[0]?.total
      newData[3] = count.papers[0]?.total
  
      setnumcount(newData)
    }
   
  },[count])
  const state = {
    series: numcount,
    options: {
      chart: {
        width: 400,
        type: 'polarArea'
      },
      labels: ['News', 'Tests', 'Faqs', 'PastPapers'],
      fill: {
        opacity: 1
      },
      stroke: {
        width: 1,
        colors: undefined
      },
      yaxis: {
        show: false
      },
      legend: {
        position: "left"
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0
          },
          spokes: {
            strokeWidth: 0
          },
        }
      },
      theme: {
        monochrome: {
          enabled: false,
          shadeTo: 'light',
          shadeIntensity: 0.6
        }
      }
    },
  }
  return(
    <div>

<ReactApexChart  options={state.options} series={state.series} type="polarArea" width={isSmallScreen ? 350:580} height={isSmallScreen ? 250:350} />
    </div>
  )
}
