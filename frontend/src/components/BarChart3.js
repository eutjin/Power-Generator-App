import React, { useState, useContext, useReducer, useEffect } from "react";
import {
  Space,
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

const BarChart = ({ data }) => {
  const [filter, setFilter] = useState(15);
  const [sort, setSort] = useState("value");
  const theme = useMantineTheme();

  const useStyles = createStyles((theme) => ({
    button: {
      display: "flex",
      // alignItems: 'center',
      justifyContent: "center",

      [`@media (max-width: 980px)`]: {
        flexDirection: "column",
      },
    },
    inputSize: {
      display: "flex",
      margin: "5px",
      alignItems: "center",
      width: "100%",
      flexWrap: "wrap",
    },
    inputLeft: {
      [`@media (max-width: 480px)`]: {
        fontSize: "0.8rem",
        margin: "5px",
      },
    },
    inputRight: {
      [`@media (max-width: 480px)`]: {
        fontSize: "0.8rem",
        margin: "5px",
      },
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
  console.log("DATA", mostCompany);
  // mostCompany=mostCompany.slice(0,filter)

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
      <div>
        <Bar
          data={{
            labels: mostCompany.map((v) => v.label), //
            datasets: [
              {
                label:
                  sort == "value"
                    ? "number of plants"
                    : "power production capacity",
                data: mostCompany.map((v) => v[sort]), //
                barPercentage: 0.5,
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
                  display: true,
                  text: sort === "value" ? "Units" : "MW",
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
      </div>
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
      <div className={classes.button}>
        <div className={classes.inputSize}>
          <Title1 order={5} mx="xs" className={classes.inputLeft}>
            Data size:
          </Title1>
          <SegmentedControl
            className={classes.inputRight}
            value={filter}
            onChange={setFilter}
            data={[
              { label: "N=5", value: 5 },
              { label: "N=10", value: 10 },
              { label: "N=15", value: 15 },
              { label: "N=20", value: 20 },
              { label: "N=25", value: 25 },
            ]}
          />
        </div>
        {/* <Space w="xl" /> */}
        <div className={classes.inputSize}>
          <Title1 order={5} mx="xs" className={classes.inputLeft}>
            Data Type:
          </Title1>
          <SegmentedControl
            className={classes.inputRight}
            value={sort}
            onChange={setSort}
            data={[
              { label: "No. of facility", value: "value" },
              { label: "Production capacity", value: "capacity" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
