import React, { useState, useContext, useReducer, useEffect } from "react";
import {
  Button,
  SimpleGrid,
  Paper,
  Text,
  Container,
  Center,
  AppShell,
  Header,
  Select,
  useMantineTheme,
  Burger,
  MediaQuery,
  Footer,
  Aside,
  Navbar,
  Space,
  RingProgress,
} from "@mantine/core";

import { Pie, Line } from "react-chartjs-2";
// import { Chart as ChartJS } from 'chart.js/auto'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement, //for pie chart
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement, //for pie chart
  LineElement, //for line chart
  PointElement, //for line chart
  Title,
  Tooltip,
  Legend
);

// defaults.global.tooltips.enabled = false;

const LineChart = ({ data }) => {
  const [data2, setData2] = useState([]);
  const [fuelType, setFuelType] = useState("");

  const fetchData = async () => {
    let url =
      "https://apis.data.go.kr/B552115/PowerTradingResultInfo/getPowerTradingResultInfo?serviceKey=hcXb%2FHslI8a0xCxDPh%2BU9zrCMXTX%2BefXDcOnSoVibf0Cz24SwSoFHAT7W2QgtXl9Cb8VrLV2Vxsgtbmm7zU2Gw%3D%3D&pageNo=1&numOfRows=600&dataType=JSON&tradeDay=20220405";

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    console.log(data.response.body.items.item);
    setData2(data.response.body.items.item);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ok but not what i really wanted to do
  const arrayz = data2.reduce((total, item) => {
    total[item.fuel] = total[item.fuel] || [];
    total[item.fuel].push(item);

    return total;
  }, {});
  console.log(arrayz);

  //transform data2, and then filter by fuel time to obtain time and value for line plot
  const array = data2
    .map((a) => ({ fuel: a.fuel, time: a.time, value: a.mgo }))
    .filter((type) => type.fuel == fuelType);
  console.log(array);

  return (
    <div>
      {/* {data.map((v)=><li>{v.label}</li>)} */}
      <Container size={1140} px={0}>
        <Paper shadow="md" radius="md" p="md">
          <div>
            <Select
              value={fuelType}
              onChange={setFuelType}
              label="Select fuel"
              placeholder="Pick one"
              data={[
                { value: "IGCC", label: "IGCC" },
                { value: "LNG", label: "LNG" },
                { value: "LPG", label: "LPG" },
                { value: "경유", label: "경유" },
                { value: "기타", label: "기타" },
                { value: "매립가스", label: "매립가스" },
                { value: "무연탄", label: "무연탄" },
                { value: "바이오가스", label: "바이오가스" },
                { value: "바이오매스", label: "바이오매스" },
                { value: "바이오중유", label: "바이오중유" },
                { value: "부생가스", label: "부생가스" },
                { value: "경유", label: "경유" },
                { value: "소수력", label: "소수력" },
                { value: "LNG", label: "LNG" },
                { value: "LPG", label: "LPG" },
                { value: "경유", label: "경유" },
              ]}
            />
          </div>
          <div>
            <Line
              data={{
                labels: array.map((v) => v.time), //
                datasets: [
                  {
                    label: fuelType,
                    data: array.map((v) => v.value), //
                    backgroundColor: "#54bebe",
                    // ["#54bebe", "#76c8c8", "#98d1d1", "#badbdb", "#dedad2", "#e4bcad", "#df979e", "#d7658b", "#c80064"]
                  },
                ],
              }}
              height={400}
              width={600}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "my bar chart",
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default LineChart;
