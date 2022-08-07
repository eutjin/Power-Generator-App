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
import { Tooltip as Tooltip1, SimpleGrid, UnstyledButton, Text, Card, Container, RingProgress, Center, Divider, createStyles, useMantineTheme, Group} from '@mantine/core';

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
  cardcontent1:{
    // fontWeight: 500,
    lineHeight: 1,
    width: '60px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
    
  },
  cardcontent:{
    // fontWeight: 500,
    lineHeight: 1,
  
  },
  cardcontent2:{
    // fontWeight: 500,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: 25,
  
  },
  cardmain:{
    fontWeight:700,
    fontSize: 18,
  },
  container:{
   
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  containerSection:{
    width: "50%",
    
    [`@media (max-width: 755px)`]: {
      width: "25%",
      
    },
    
  },
  containerPercent:{
    display:"flex",
  },
}));
const { classes } = useStyles();

    return (
      <>
        {" "}
        <div>
          {/* {data.map((v)=><li>{v.label}</li>)} */}
          <Container size={600}>
            <Doughnut
              data={{
                labels: data.slice(0, 15).map((v) => v.label), //slice to get first n=8 entries in array due to complexity of chart
                datasets: [
                  {
                    label: "number of plants",
                    data: data.slice(0, 15).map((v) => Math.round(v.capacity)), //
                    backgroundColor:
                      // ["#54bebe", "#76c8c8", "#98d1d1", "#badbdb", "#dedad2", "#e4bcad", "#df979e", "#d7658b", "#c80064"]
                      [
                        "#fc956f",
                        "#ffc170",
                        "#ff7070",
                        "#067564",
                        "#0f9583",
                        "#65e0d4",
                        "#5bc0be",
                        "#2b3122",
                        "#3c4134",
                        "#616454",
                        "#a19685",
                        "#baa997",
                        "#725b46",
                        "#0b132b",
                        "#1c2541",
                        "#3a506b",
                      ],
                  },
                ],
              }}
              height={300}
              width={500}
              options={{
                plugins: {
                  title: {
                    display: false,
                    text: "my bar chart",
                  },
                  legend: {
                    position: "right",
                    align: "start",
                    title: {
                      position: "center",
                    },
                  },
                  tooltips: {
                    callbacks: {
                      label: (data) => `${data.label}: Rp. ${data.parsed}`,
                    },
                  },
                  // legend:{
                  //   position: 'right',
                  // }
                },
                maintainAspectRatio: false,
                // cutoutPercentage:10,
              }}
            />
          </Container>
        </div>
        <div>
          <SimpleGrid
            cols={5}
            mt="md"
            breakpoints={[
              { maxWidth: 980, cols: 2, spacing: "xs" },
              { maxWidth: 755, cols: 1, spacing: "xs" },
            ]}
          >
            {data.map((v, index) =>
              Math.round(v.capacity) > 0 ? (
                <Card withBorder radius="md" p="xs" key={v.label}>
                  {/* <UnstyledButton key={v.label} > */}
                  
                    <div className={classes.container}>
                     
                        <div className={classes.containerSection}>
                          <Text size="xs" color="dimmed">
                            Fuel Type
                          </Text>
                          <Tooltip1
                            wrapLines
                            // width={150}
                            withArrow
                            transition="fade"
                            transitionDuration={120}
                            label={v.label}
                          >
                            <Text
                              align="left"
                              size="md"
                              className={classes.cardcontent1}
                            >
                              {v.label}
                            </Text>
                          </Tooltip1>
                        </div>
                        <div className={classes.containerSection}>
                          
                          <div className={classes.containerPercent}>
                            <Text
                              align="center"
                              color="blue"
                              className={classes.cardcontent2}
                            >
                              {((v.capacity / totalCapacity) * 100).toFixed(2)}
                            </Text>
                            <Text color="blue" >
                              %
                            </Text>
                          </div>
                        </div>
                      
                      
                        <div className={classes.containerSection}>
                          <Text size="xs" color="dimmed" >
                            Position
                          </Text>
                          <Text
                            align="left"
                            size="md"
                            className={classes.cardcontent}
                          >
                            {index + 1}
                          </Text>
                        </div>
                        <div className={classes.containerSection}>
                          <Text size="xs" color="dimmed" >
                            Capacity (MW)
                          </Text>
                          <Text
                            align="left"
                            size="md"
                            className={classes.cardcontent}
                          >
                            {Math.round(v.capacity).toLocaleString()}
                          </Text>
                        </div>
                     
                    </div>
                  
                  {/* </UnstyledButton> */}
                </Card>
              ) : null
            )}
          </SimpleGrid>
        </div>
        {/* <button onClick={()=>resetZoom1()}>test</button> */}
      </>
    );
}

export default DoughnutChart;