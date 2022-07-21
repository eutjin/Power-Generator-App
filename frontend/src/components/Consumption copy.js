import React, { useState, useContext, useReducer, useEffect } from "react";
import { DatePicker } from '@mantine/dates';
import { Calendar } from 'tabler-icons-react';
import axios from "axios";
import styles from "./Consumption.module.css";

import {
  Card,
  createStyles,
  Divider,
  Title as Title1,
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

const Consumption= ({data}) => {

    const [allMetro, setAllMetro]= useState(data)
    const [year, setYear]= useState("2020")
    const [month, setMonth]= useState("11")
    const [date, setDate]= useState("")
    const [consData, setConsData]= useState([])
  const [metroCons, setMetroCons]= useState([])
  const [metroPower, setMetroPower]= useState([])

    const useStyles = createStyles((theme) => ({
        label: {
          lineHeight: 1,
        },
        item: {
          height: 200,
        },
        itemtext: {
          fontSize: 25,
          lineHeight: 1,
        },
        itemtext2: {
          fontSize: 20,
          lineHeight: 1,
          bottom: 0,
        },
        button2:{
          position:"absolute",
          "& #부산광역시":{
            left: "15%",
            top:"20%",
          },
        },
        button3:{
          position:"absolute",
          top: "15%",
          left: "35%",
        },
      }));
      const { classes } = useStyles();
  
useEffect(()=>{
    console.log("metro", allMetro)
    fetchData()
}, [])

useEffect(()=>{
    console.log("metro", allMetro)
    fetchData()
}, [year, month])

const fetchData=()=>{
    const variable={
        year: year,
        month: month, 
        metro: data,
    }
    console.log("var",variable)

    axios.post("http://localhost:5000/api/consumption/average/", variable).then(response=>{
      if(response.data.success){
        console.log("average", response.data.array)
        setConsData(response.data.array)
      }else{
        alert("get failed")
      }
    })
}

useEffect(()=>{
  let cons= consData.reduce((total, item)=>{
    const {metro, houseCnt, powerUsage}= item;

    if (!total[metro]){
        total[metro]= {houseCnt: houseCnt, city: 1, ttlPower: houseCnt*powerUsage, metro: metro}
    }
    else{
        total[metro]= {...total[metro],ttlPower:total[metro].ttlPower+(houseCnt*powerUsage), houseCnt:total[metro].houseCnt+houseCnt, city: total[metro].city+1}
    }

return total;
}, {})
console.log("cons", cons)
setMetroCons(Object.values(cons))

console.log("joke",metroCons)


}, [consData])

useEffect(()=>{
  const modMetroCons= metroCons.map((item)=>({...item, powerUsage: item.ttlPower/item.houseCnt}))
  console.log("joke2", modMetroCons)
  setMetroPower(modMetroCons)
}, [metroCons])

useEffect(()=>{
  console.dir("joke3", (metroPower.find(item=>item.metro=="강원도")))
  // console.log("joke3", (metroPower.filter(item=>item.metro=="강원도")[0]).powerUsage)
}, [metroPower])

const metroPro=(metroNm)=>{
  console.log("convertion",metroNm)
  if(metroNm=="경상남도"){
    return "경남"
  }
  else if(metroNm=="충청남도"){
    return "충남"
  }
  else if(metroNm=="충청북도"){
    return "충북"
  }
  else if(metroNm=="경상북도"){
    return "경북"
  }
  else if(metroNm=="전라남도"){
    return "전남"
  }
  else if(metroNm=="전라북도"){
    return "전북"
  }
  else {
    return metroNm.slice(0,2)
  }
}


const moddate=()=>{
    console.dir(date)
    let month=new Date(date).getMonth();//remember to use "new Date". huge bug caused when not in use previously
    
    month=month+1; //get month starts from zero
    if (month<10){
          month =`${0}${month}`;
    }
    let year= new Date(date).getFullYear();
    year=`${year}`

    console.log("year", year)
    console.log("month", month)
    setMonth(month)
    setYear(year)
    
  }

  useEffect(()=>{
    moddate()
  }, [date])
        

  return (
//     <div>
//       <Container size={1140} px={0}>
//               <Card radius="md" shadow="md">
//                 <Card.Section className={classes.title} shadow="md">
//                   <Title1 order={3} px={15} py={15}>
//                     Average consumption
//                   </Title1>
//                   {/* <Divider size="xs" /> */}
//                 </Card.Section>

//                 <div>
//             <DatePicker
//               label="Date"
//               placeholder="Select date"
//               value={date}
//               onChange={setDate}
//               icon={<Calendar size={16} />}
//               excludeDate={(date) => date.getMonth() ==4}
//             />
//           </div>

// <div>
//                 {allMetro.map((item)=>(<Button m="lg"><div>{item.codeNm}<br/>qq</div></Button>))}
//                 </div>
//               </Card>
//             </Container>
//     </div>
<>
<DatePicker
              label="Date"
            placeholder="Select date"
            value={date}
            onChange={setDate}
            icon={<Calendar size={16} />}
             excludeDate={(date) => date.getMonth() ==4}
             />
  
{/* <Button className={classes.button2}>강원 {metroPower.filter(item=>item.metro=="강원").powerUsage}</Button>
<Button className={classes.button3}>경기</Button> */}

               {/* {metroPower.map((item)=>(<button id={item.metro} className={styles.buttons}><div>{Math.round(item.powerUsage)}kWh<br/>{metroPro(item.metro)}</div></button>))} */}
               {metroPower.map((item)=>(<button id={item.metro} className={styles.buttons}>{metroPro(item.metro)}:{Math.round(item.powerUsage)}kWh</button>))}

</>
  );
};

export default Consumption;

// {metroPower.filter(item=>item.metro=="강원").}
