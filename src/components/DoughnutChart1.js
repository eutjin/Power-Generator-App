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
import { SimpleGrid, UnstyledButton, Text, Card, Container, RingProgress, Center, Divider, createStyles, useMantineTheme, Group} from '@mantine/core';

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


const DoughnutChart = ({data, totalCapacity})=>{

    // const resetZoom1=()=>{
    //    Bar.resetZoom();
    // }
    const theme = useMantineTheme();
const useStyles = createStyles((theme) => ({
  cardcontent:{
    // fontWeight: 500,
    lineHeight: 1,
  },
  cardmain:{
    fontWeight:700,
    fontSize: 18,
  }
}));
const { classes } = useStyles();

    return <> <div>
        {/* {data.map((v)=><li>{v.label}</li>)} */}
        <Container size={600}>
        <Doughnut
       data={{
            labels: data.slice(0, 20).map((v)=>v.label),//slice to get first n=8 entries in array due to complexity of chart
            datasets: [{
                label: 'number of plants',
                data: (data.slice(0,20).map((v)=>Math.round(v.capacity))) ,//
                backgroundColor: 
                // ["#54bebe", "#76c8c8", "#98d1d1", "#badbdb", "#dedad2", "#e4bcad", "#df979e", "#d7658b", "#c80064"]
                ["#fc956f","#ffc170","#ff7070","#067564","#0f9583","#65e0d4","#5bc0be","#2b3122","#3c4134","#616454","#a19685","#baa997","#725b46","#0b132b","#1c2541","#3a506b",]
              
            }]
        }}
        height={300}
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
              align: "start",
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
        /></Container>
        
    </div>
    <div>

      <SimpleGrid cols={4} mt="md">
        
        {data.map((v, index)=>((Math.round(v.capacity)>0)?
          
         

        (
          <Card withBorder radius="md" p='xs' key={v.label} >
           {/* <UnstyledButton key={v.label} > */}
          
           <div>
           

           <Text size="xs" color="dimmed" >Fuel Type</Text>
           <Text align="left" size="md" className={classes.cardcontent} >
             {v.label} 
           </Text>
          <Group spacing={28}>
            
          <div>
           <Text size="xs" color="dimmed" mt={7}>Position</Text>
           <Text align="left" size="md" className={classes.cardcontent} >
             {index+1} 
           </Text>
           </div>
           <div>
           <Text size="xs" color="dimmed" mt={7}>Capacity (MW)</Text>
           <Text align="left" size="md"  className={classes.cardcontent} >
           {Math.round(v.capacity)} 
           </Text>
           
           
           </div>
           <div>
           <Text size="xs" color="dimmed" mt={7}>Percentage</Text>
           <Text size="lg" align="center" className={classes.cardcontent} >
            {((v.capacity/totalCapacity)*100).toFixed(2)} %
           </Text>
           </div>
           </Group>
          </div>      
        
           
           
                  
           
         {/* </UnstyledButton> */}
         </Card>):null
        )
        )}
        
      </SimpleGrid>
    </div>
    {/* <button onClick={()=>resetZoom1()}>test</button> */}
    </>
}

export default DoughnutChart;