import React, { useState, useContext, useReducer, useEffect } from "react";
import {
  Space, Select,
  Title as Title1,
  Text,
  useMantineTheme,
  createStyles,
  Group,
  Button,
  Tabs,
  SegmentedControl,
} from "@mantine/core";
import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS } from 'chart.js/auto'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FileX } from "tabler-icons-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// defaults.global.tooltips.enabled = false;

const CityChart = ({ data}) => {
  const [filter, setFilter] = useState(15);
  const [sort, setSort] = useState("value");
  
  const theme = useMantineTheme();

  const useStyles = createStyles((theme) => ({
    button:{
      display: 'flex',
      alignItems: 'center',
    justifyContent: 'center',
    },
    chartContainer:{
      position: "relative",
      
    },
    chartTitleY:{
      position: "absolute",
      
      // left: "0.3rem",
      fontSize: "10px",
    },
  }));
  const { classes } = useStyles();

  const mostCompany = Object.values(data)
    .sort((a, b) => {
      if (sort == "value") {
        return b.value - a.value;
      } else if (sort == "capacity") {
        return b.capacity - a.capacity;
      }
    })
    .slice(0, filter);

  // mostCompany=mostCompany.slice(0,filter)

    console.log("city Chart",data)
    const citySort= Object.values(data).sort((a,b)=>{
      return b.powerUsage-a.powerUsage
    })

  

  return (
    <div>
      {/* {data.map((v)=><li>{v.label}</li>)} */}

      {/* <div>
        <Tabs>
      <Tabs.Tab label="n=5" > {()=>console.log("hit")} </Tabs.Tab>
      <Tabs.Tab label="n=10" onClick={()=>setFilter(10)}/>
      <Tabs.Tab label="n=15" onClick={()=>setFilter(15)}/>
      
      <Tabs.Tab label="n=20" onClick={()=>setFilter(20)}/>
      
      
    </Tabs>
        </div> */}
     
     <div className={classes.chartContainer}>
          <div className={classes.chartTitleY}><Text size="sm">MWh</Text></div>
      <div >
      
        <Bar
          data={{
            labels: citySort.map((v) => v.city), //
            datasets: [
              {
                label: "Average Energy Usage",
                data: citySort.map((v) => v.powerUsage), //
                barPercentage: citySort.length<5? 0.2: 0.5,
                backgroundColor: ["#54bebe"],
              },
            ],
          }}
          height={450}
          width={600}
          options={{
            plugins: {
              title: {
                display: false,
                text: "my bar chart",
              },
              tooltip:{
                callbacks:{
                  afterTitle:()=>{return "Energy Use"},
                  label: (context)=>{return context.parsed.y+" kWh"},
                },
              },
             
            },
            maintainAspectRatio: false,
           
            
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },

              yAxes: {
                title: {
                  display: false,
                  text: "kWh/day",
                  align: "center",
                  font: {
                    size: 15,
                  },
                },
                ticks: {
                  beginAtZero: true,
                },
              },
            },
          }}
        />
      </div></div>
      <div>
        {/* <Group>
          <Button
            color="teal"
            variant="light"
            size="xs"
            onClick={() => setFilter(5)}
          >
            N=5
          </Button>
          <Button
            color="teal"
            variant="light"
            size="xs"
            onClick={() => setFilter(10)}
          >
            N=10
          </Button>
          <Button
            color="teal"
            variant="light"
            size="xs"
            onClick={() => setFilter(15)}
          >
            N=15
          </Button>
          <Button
            color="teal"
            variant="light"
            size="xs"
            onClick={() => setFilter(20)}
          >
            N=20
          </Button>
          <Button
            color="teal"
            variant="light"
            size="xs"
            onClick={() => setFilter(25)}
          >
            N=25
          </Button>
        </Group> */}
      </div>
      {/* <div className={classes.button}>
        <Title1 order={4} mx="sm">Data size:</Title1>
      <SegmentedControl
          value={filter}
          onChange={setFilter}
          data={[
            { label: "N=5", value: 5 },
            { label: "N=10", value: 10},
            { label: "N=15", value: 15 },
            { label: "N=20", value: 20},
            { label: "N=25", value: 25},
          ]}
        />
        <Space w="xl" />
         <Title1 order={4} mx="sm">Data Type:</Title1>
        <SegmentedControl
          value={sort}
          onChange={setSort}
          data={[
            { label: "No. of facility", value: "value" },
            { label: "Production capacity", value: "capacity" },
          ]}
        />
      </div> */}
    </div>
  );
};

export default CityChart;
