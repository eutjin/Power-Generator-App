import React, { useState, useContext, useReducer, useEffect } from "react";
import { DatePicker } from '@mantine/dates';
import { Calendar } from 'tabler-icons-react';
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
  Skeleton,
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

const LineChart = () => {
  const [data2, setData2] = useState([]);
  const [fuelType, setFuelType] = useState("");
  const [fuelType2, setFuelType2] = useState("");
  const [date, setDate]= useState("")
  const [apiDate, setApiDate]= useState(20220401)

  const fetchData = async () => {
    let url =
      `https://apis.data.go.kr/B552115/PowerTradingResultInfo/getPowerTradingResultInfo?serviceKey=hcXb%2FHslI8a0xCxDPh%2BU9zrCMXTX%2BefXDcOnSoVibf0Cz24SwSoFHAT7W2QgtXl9Cb8VrLV2Vxsgtbmm7zU2Gw%3D%3D&pageNo=1&numOfRows=600&dataType=JSON&tradeDay=${apiDate}`;

    const response = await fetch(url);
    const data = await response.json();
    console.dir(data);
    console.dir(data.response.body.items.item);
    setData2(data.response.body.items.item);
  };
// if(date){
//     console.dir(date)
//   let month=date.getMonth();
//   month=month+1; //get month starts from zero
//   if (month<10){
//         month =`${0}${month}`;
//   }
//   let day=date.getDate();
//   if (day<10){
//     day =`${0}${day}`;
// }
        

//   let year= date.getFullYear();
//   let newDate= `${year}${month}${day}`
//   console.dir(newDate)
//   setApiDate(newDate)
  
//   console.dir(apiDate)
// }

// setApiDate(20220404)
const moddate=()=>{
    console.dir(date)
    let month=new Date(date).getMonth();//remember to use "new Date". huge bug caused when not in use previously
    
    month=month+1; //get month starts from zero
    if (month<10){
          month =`${0}${month}`;
    }
    let day=new Date(date).getDate();
    if (day<10){
      day =`${0}${day}`;
  }
          
  
    let year= new Date(date).getFullYear();
    let newDate= `${year}${month}${day}`
    console.dir(newDate)
    setApiDate(newDate)
    
    console.dir(apiDate)
}

  useEffect(() => {
   moddate();
    // fetchData();
  }, [date]);

  useEffect(()=>{
    fetchData();
  }, [apiDate])

//   const gooddate=(date)=>{
//     let month=date.getMonth();
//   month=month+1; //get month starts from zero
//   if (month<10){
//         month =`${0}${month}`;
//   }
//   let day=date.getDate();
//   if (day<10){
//     day =`${0}${day}`;
// }
        

//   let year= date.getFullYear();
//   let newDate= `${year}${month}${day}`
//   console.dir(newDate)
//   setApiDate(newDate)
  
//   console.dir(apiDate)
// }
//   }
  // ok but not what i really wanted to do
  const arrayz = data2.reduce((total, item) => {
    total[item.fuel] = total[item.fuel] || [];
    total[item.fuel].push(item);

    return total;
  }, {});
  console.dir(arrayz);

  //transform data2, and then filter by fuel time to obtain time and value for line plot
  const array1 = data2
    .map((a) => ({ fuel: a.fuel, time: a.time, value: a.mgo }))
    .filter((type) => type.fuel == fuelType);
  console.dir(array1);

  //anoter line for comparison with first data line
  const array2 = data2
    .map((a) => ({ fuel: a.fuel, time: a.time, value: a.mgo }))
    .filter((type) => type.fuel == fuelType2);
  console.dir(array2);

  return (
    <div>
      {/* {data.map((v)=><li>{v.label}</li>)} */}
      <Container size={1140} px={0}>
        <Paper shadow="md" radius="md" p="md">
        <SimpleGrid cols={5}>
          <div>
            <DatePicker
              label="Date"
              placeholder="Select date"
              value={date}
              onChange={setDate}
              icon={<Calendar size={16} />}
              excludeDate={(date) => date.getMonth() ==4}
            />
          </div>

          <div>
            <Select
              clearable
              value={fuelType}
              onChange={setFuelType}
              label="Select fuel"
              placeholder="Fuel Type"
              data={[
                { value: "DER", label: "DER" },
                { value: "IGCC", label: "IGCC" },
                { value: "LNG", label: "LNG" },
                { value: "LPG", label: "LPG" },
                { value: "RPS", label: "RPS" },
                { value: "경유", label: "경유" },
                { value: "기타", label: "기타" },
                { value: "매립가스", label: "매립가스" },
                { value: "무연탄", label: "무연탄" },
                { value: "바이오가스", label: "바이오가스" },
                { value: "바이오매스", label: "바이오매스" },
                { value: "바이오중유", label: "바이오중유" },
                { value: "부생가스", label: "부생가스" },
                { value: "소수력", label: "소수력" },
                { value: "수력", label: "수력" },
                { value: "연료전지", label: "연료전지" },
                { value: "원자력", label: "원자력" },
                { value: "유연탄", label: "유연탄" },
                { value: "중유", label: "중유" },
                { value: "태양광", label: "태양광" },
                { value: "폐기물", label: "폐기물" },
                { value: "풍력", label: "풍력" },
                { value: "해양에너지", label: "해양에너지" },
              ]}
            />
          </div>
          <div>
            <Select
              clearable
              value={fuelType2}
              onChange={setFuelType2}
              label="Select fuel"
              placeholder="Fuel Type"
              data={[
                { value: "DER", label: "DER" },
                { value: "IGCC", label: "IGCC" },
                { value: "LNG", label: "LNG" },
                { value: "LPG", label: "LPG" },
                { value: "RPS", label: "RPS" },
                { value: "경유", label: "경유" },
                { value: "기타", label: "기타" },
                { value: "매립가스", label: "매립가스" },
                { value: "무연탄", label: "무연탄" },
                { value: "바이오가스", label: "바이오가스" },
                { value: "바이오매스", label: "바이오매스" },
                { value: "바이오중유", label: "바이오중유" },
                { value: "부생가스", label: "부생가스" },
                { value: "소수력", label: "소수력" },
                { value: "수력", label: "수력" },
                { value: "연료전지", label: "연료전지" },
                { value: "원자력", label: "원자력" },
                { value: "유연탄", label: "유연탄" },
                { value: "중유", label: "중유" },
                { value: "태양광", label: "태양광" },
                { value: "폐기물", label: "폐기물" },
                { value: "풍력", label: "풍력" },
                { value: "해양에너지", label: "해양에너지" },
              ]}
            />
          </div>
          </SimpleGrid>
          <div>
            <Line
              data={{
                labels: array1.map((v) => v.time), //
                datasets: [
                  {
                    label: fuelType,
                    data: array1.map((v) => v.value), //
                    borderColor: "#54bebe",
                    backgroundColor: "#54bebe",
                    // ["#54bebe", "#76c8c8", "#98d1d1", "#badbdb", "#dedad2", "#e4bcad", "#df979e", "#d7658b", "#c80064"]
                  },
                  {
                    label: fuelType2,
                    data: array2.map((v) => v.value), //
                    borderColor: "#e4bcad",
                    backgroundColor: "#e4bcad",
                  },
                ],
              }}
              height={400}
              width={600}
              options={{
                plugins: {
                  title: {
                    display: true,
                    // text: "my bar chart",
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
