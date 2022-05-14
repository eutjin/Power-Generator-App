import React from 'react'

import {Doughnut} from 'react-chartjs-2'
import zoomPlugin, { resetZoom } from 'chartjs-plugin-zoom';
// import { Chart as ChartJS } from 'chart.js/auto'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';
import { SimpleGrid, UnstyledButton, Text, Card } from '@mantine/core';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    ArcElement,
    Legend, zoomPlugin
  );

// defaults.global.tooltips.enabled = false;

const DoughnutChart = ({data})=>{

    // const resetZoom1=()=>{
    //    Bar.resetZoom();
    // }

    return <> <div>
        {/* {data.map((v)=><li>{v.label}</li>)} */}
        <Doughnut
       data={{
            labels: data.slice(0, 8).map((v)=>v.label),//slice to get first n=8 entries in array due to complexity of chart
            datasets: [{
                label: 'number of plants',
                data: (data.slice(0,8).map((v)=>Math.round(v.capacity))) ,//
                backgroundColor: 
                // ["#54bebe", "#76c8c8", "#98d1d1", "#badbdb", "#dedad2", "#e4bcad", "#df979e", "#d7658b", "#c80064"]
                ["#fc956f","#ffc170","#ff7070","#067564","#0f9583","#65e0d4","#5bc0be","#2b3122","#3c4134","#616454","#a19685","#baa997","#725b46","#0b132b","#1c2541","#3a506b",]
              
            }]
        }}
        height={400}
        width={400}
        options={
          {
            plugins:{
            title: {
                display: false,
                text: 'my bar chart',
            },
            legend:{
              position: "right",
              align: "center",
              title:{
                position: "center",
              }
            },
            tooltips:{
              callbacks: {
                label: (data) => (`${data.label}: Rp. ${data.parsed}`)
                    
            },
            }
            // legend:{
            //   position: 'right',
            // }
        },
            maintainAspectRatio:false,
            // cutoutPercentage:10,
            
        }
      }
        />
        
    </div>
    <div>

      <SimpleGrid cols={6} mt="md">
        
        {data.map((v)=>(
          <Card withBorder radius="md">
           <UnstyledButton key={v.label} >
           
           <Text size="xs" mt={7}>
             {v.label}
           </Text>
           <Text size="xs" mt={7}>
             {Math.round(v.capacity)} MW
           </Text>
           
         </UnstyledButton>
         </Card>
        ))}
        
      </SimpleGrid>
    </div>
    {/* <button onClick={()=>resetZoom1()}>test</button> */}
    </>
}

export default DoughnutChart;