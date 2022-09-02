import React, { useState, useContext, useReducer, useEffect, useRef } from "react";
import { DatePicker } from '@mantine/dates';
import { Calendar, FileX } from 'tabler-icons-react';
import CityChart from "./CityChart";
import axios from "axios";
import baseUrl from "../BaseUrl";
// import styles from "./Consumption.module.css";

import { useMediaQuery } from '@mantine/hooks';
import {
  Card, Table, ScrollArea, SegmentedControl, 
  createStyles,
  Divider,
  Title as Title1,
  Button, Modal,
  SimpleGrid,
  Paper,
  Text,
  Container,
  Center,
  AppShell,
  Header,
  Select,
  useMantineTheme,
 Group, Menu,
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
  const [metroBill, setMetroBill]= useState([])

  const [consModal, setConsModal]= useState(false)
  const [metroNm, setMetroNm]= useState({})
  const [metroAllCity, setMetroAllCity]= useState([])
  const [metro, setMetro]= useState("")
  const [type, setType]= useState("map")
  const [metroHseCnt, setMetroHseCnt]= useState("")
  const [metroCityCnt, setMetroCityCnt]= useState("")
  const [metroPwrUse, setMetroPwrUse]= useState("")
  const [width, setWidth]= useState()

  const refSvg = useRef(null);
  const isMobile = useMediaQuery('(max-width: 755px)');

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
        modalContainer:{
          width:"70%",
          [`@media (max-width: 480px)`]: {
            width:"100%",
          },
        },
        modalInfo:{
          width: "90%",
          display: "flex",
          flexWrap: "wrap",
          padding: "10px",
          margin: "0 auto",
justifyContent: "center",
          div:{
            margin: "5px",
          },
        },
        // button2:{
        //   position:"absolute",
        //   "& #부산광역시":{
        //     left: "15%",
        //     top:"20%",
        //   },
        // },
        // button3:{
        //   position:"absolute",
        //   top: "15%",
        //   left: "35%",
        // },


        container:{
          // position: "relative",
         
          

          svg:{//added
            width:"100%",
            
            // display: "inlineTable",

           
          }
        },
        containerSvg:{
          position: "relative",
          width: "50%",
          margin: "0 auto",
          [`@media (max-width: 480px)`]: {
            width:"100%",
          },
        },
        imageEdge:{
          position: "relative",
        },
        button:{
          
          [`@media (max-width: 755px)`]: {
            fontSize: "0.8rem",
          },
        },
        
          image:{
          display: "block",
          stroke: "red",
          verticalAlign:"top",
          position: "relative",//added
  
          '&:hover':{
              fill:"blue",
          }
         },
         image2:{
          fill:"blue",
          strokeLinecap:"round",
  
          '&:hover':{
              fill:"green",
              transition: "200ms Ease",
          }
         },
         single:{
          stroke: "#cfe9e6",
          fill: "#57b4a8",
  
          '&:hover':{
              fill: "#0f9583",
              transition: "300ms Ease",
          }
         },
         header:{
          position: 'sticky',
          backgroundColor: theme.white,
          top: 10,
          boxShadow: theme.shadows.sm,
        },
        modalText:{
          lineHeight: 1,
        },
        // metrovalue:{
        //   color: 'green',

        //   "& #강원도":{
        //     color: "blue",
        //   }
        // },
        
      }));
      const { classes } = useStyles();
  
useEffect(()=>{
    console.log("metro", allMetro)
    // setYear("2020")
    // setMonth("04")
    fetchData()
}, [])

// useEffect(()=>{
// console.log("WIDTH", refSvg.current.getBoundingClientRect().width)
// setWidth(refSvg.current.getBoundingClientRect().width)

// window.addEventListener("resize", resizer);

//     return () => window.removeEventListener("resize", resizer);

// }, [refSvg.current])

// const resizer=()=>{
//   console.log("WIDTH2", refSvg.current.getBoundingClientRect().width)
//   setWidth(refSvg.current.getBoundingClientRect().width)
// }

useEffect(()=>{
  
    console.log("metro", allMetro)
    fetchData()

}, [year, month])

useEffect(()=>{
  if(consModal){
    console.log("step1")
    const metro1= metroPower.find((item)=>(item.metro==metro))
    console.log(metro1)
  //7
  setMetroNm(metro1)

}
}, [metroPower])

useEffect(()=>{
  if(consModal){
    console.log("step2")
    const allCity= consData.filter((item)=>(item.metro==metro))
    setMetroAllCity(allCity)
  }
}, [metroNm])

const fetchData=()=>{
    const variable={
        year: year,
        month: month, 
        metro: data,
    }
    console.log("var",variable)
    console.log("base", baseUrl)

    axios.post(baseUrl+"/api/consumption/average/", variable).then(response=>{
      if(response.data.success){
        console.log("average", response.data.array)//.array
        setConsData(response.data.array)
      }else{
        alert("get failed")
      }
    })
}

useEffect(()=>{
  let cons= consData.reduce((total, item)=>{
    const {metro, houseCnt, powerUsage, bill}= item;

    if (!total[metro]){
        total[metro]= {houseCnt: houseCnt, city: 1, ttlPower: houseCnt*powerUsage, ttlBill: houseCnt*bill,  metro: metro}
    }
    else{
        total[metro]= {...total[metro],ttlPower:total[metro].ttlPower+(houseCnt*powerUsage), ttlBill:total[metro].ttlBill + (houseCnt*bill), houseCnt:total[metro].houseCnt+houseCnt, city: total[metro].city+1}
    }

return total;
}, {})
console.log("cons", cons)
console.log("consData", consData)
setMetroCons(Object.values(cons))

console.log("joke",metroCons)


}, [consData])

useEffect(()=>{
  const modMetroCons= metroCons.map((item)=>({...item, powerUsage: item.ttlPower/item.houseCnt, powerBill: item.ttlBill/item.houseCnt}))
  console.log("joke2", modMetroCons)
  const desModMetroCons= Object.values(modMetroCons).sort((a,b)=>{
    return b.powerUsage - a.powerUsage;
  })
  setMetroPower(desModMetroCons)//7

  const desModMetroBill= Object.values(modMetroCons).sort((a,b)=>{
    return b.powerBill - a.powerBill;
  })
  setMetroBill(desModMetroBill)
}, [metroCons])

useEffect(()=>{
  console.log("metroPowwer",metroPower)
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

useEffect(()=>{
console.table(metroPower)

const a1= document.querySelectorAll("button#강원도")
console.log("mydoc",a1[1])

}, [metroPower])


// const moddate=()=>{
//     console.dir(date)
//     let month=new Date(date).getMonth();//remember to use "new Date". huge bug caused when not in use previously
    
//     month=month+1; //get month starts from zero
//     if (month<10){
//           month =`${0}${month}`;
//     }
//     let year= new Date(date).getFullYear();
//     year=`${year}`

//     console.log("year", year)
//     console.log("month", month)
//     setMonth(month)
//     setYear(year)
    
//   }

//   useEffect(()=>{
//     moddate()
//   }, [date])
        
  const handelModal=(nm)=>{
    
    setMetro(nm)
    setConsModal(true)

    const metro= metroPower.find((item)=>(item.metro==nm))
    console.log("meetrro",metro)
    setMetroNm(metro)
   const allCity= consData.filter((item)=>(item.metro==nm))
   setMetroAllCity(allCity)
   console.table(metroAllCity)
  }

  const rows = metroPower.map((element, index) => (
    <tr key={element.metro} onClick={(e) => handelModal(element.metro)}>
      <td>{index+1}</td>
      <td>{element.metro}</td>
      
      <td>{Math.round(element.powerUsage)}</td>
    
    </tr>
  ));

  // useEffect(()=>{
  //   if(consModal){
  //     const metro= metroPower.find((item)=>(item.metro==metroNm.metro))
    
  //   setMetroNm(metro)
  //     const allCity= consData.filter((item)=>(item.metro==metroNm.metro))
  //  setMetroAllCity(allCity)
  //   }
  // }, [year, month])

//   const updateYear=(data)=>{
// console.log("updateyear", data)
// setYear(data)
//   }

//   const updateMonth=(data)=>{
//     console.log("updatemonth", data)
//     setMonth(data)
//   }
const inputs=(<>
  <Group>
  <Select
    label="Year"
    placeholder="Select Year"
    value={year}
    onChange={setYear}
    data={[
      { value: "2022", label: "2022" },
      { value: "2021", label: "2021" },
      { value: "2020", label: "2020" },
      { value: "2019", label: "2019" },
    ]}
  />

  <Select
    label="Month"
    placeholder="Select Month"
    value={month}
    onChange={setMonth}
    data={
      year != "2022"
        ? [
            { value: "01", label: "January" },
            { value: "02", label: "February" },
            { value: "03", label: "March" },
            { value: "04", label: "April" },
            { value: "05", label: "May" },
            { value: "06", label: "June" },
            { value: "07", label: "July" },
            { value: "08", label: "August" },
            { value: "09", label: "September" },
            { value: "10", label: "October" },
            { value: "11", label: "November" },
            { value: "12", label: "December" },
          ]
        : [
            { value: "01", label: "January" },
            { value: "02", label: "February" },
          ]
    }
  />
  {!consModal? (<SegmentedControl className={classes.segment}
                      mx={15} mt={28}
                      color="teal"
                      value={type}
                      onChange={setType}
                      data={[
                        { label: "Map", value: "map" },
                        { label: "Table", value: "table" },
                      ]}
                    />):null}
  
</Group></>
)

  return (
    <>
      <Container size={1140} px={0}>
        <Card radius="md" shadow="md">
          <Card.Section className={classes.title} shadow="md">
            <Title1 order={4} px={15} py={15}>
              Daily Average Energy Use
            </Title1>
            <Divider size="xs" />
          </Card.Section>
          {/* <Group>
            <Select
              label="Year"
              placeholder="Select Year"
              value={year}
              onChange={setYear}
              data={[
                { value: "2022", label: "2022" },
                { value: "2021", label: "2021" },
                { value: "2020", label: "2020" },
                { value: "2019", label: "2019" },
              ]}
            />

            <Select
              label="Month"
              placeholder="Select Month"
              value={month}
              onChange={setMonth}
              data={
                year != "2022"
                  ? [
                      { value: "01", label: "January" },
                      { value: "02", label: "February" },
                      { value: "03", label: "March" },
                      { value: "04", label: "April" },
                      { value: "05", label: "May" },
                      { value: "06", label: "June" },
                      { value: "07", label: "July" },
                      { value: "08", label: "August" },
                      { value: "09", label: "September" },
                      { value: "10", label: "October" },
                      { value: "11", label: "November" },
                      { value: "12", label: "December" },
                    ]
                  : [
                      { value: "01", label: "January" },
                      { value: "02", label: "February" },
                    ]
              }
            />
          </Group> */}
          {inputs}

          <Modal
            centered
            opened={consModal}
            onClose={() => setConsModal(false)}
            classNames={{ modal: classes.modalContainer }}
          >
            {inputs}
            <div className={classes.modalInfo}>
              <div>
                <Text size="sm" color="dimmed" className={classes.modalText}>
                  current metro
                </Text>
                <Text size="lg">{metroNm.metro}</Text>
              </div>
              <div>
                <Text size="sm" color="dimmed" className={classes.modalText}>
                  number of cities:
                </Text>
                <Text size="lg">{metroNm.city}</Text>
              </div>
              <div>
                <Text size="sm" color="dimmed" className={classes.modalText}>
                  no. of residence:
                </Text>
                <Text size="lg">
                  {Math.round(metroNm.houseCnt).toLocaleString()}
                </Text>
              </div>
              <div>
                <Text size="sm" color="dimmed" className={classes.modalText}>
                  Daily Power Usage:
                </Text>
                <Text size="lg">{Math.round(metroNm.powerUsage)} kWh</Text>
              </div>
              </div>

            {/* <Text>no. of residence: {metroNm.houseCnt}</Text>
            <Text>Daily Power Usage: {Math.round(metroNm.powerUsage)}kWh</Text> */}
            <CityChart data={metroAllCity} />
            
          </Modal>
          {/* convertion 강원도
Consumption.js:192 convertion 충청북도
Consumption.js:192 convertion 전라남도
Consumption.js:192 convertion 서울특별시
Consumption.js:192 convertion 충청남도
Consumption.js:192 convertion 경상남도
Consumption.js:192 convertion 대전광역시
Consumption.js:192 convertion 광주광역시
Consumption.js:192 convertion 경상북도
Consumption.js:192 convertion 부산광역시
Consumption.js:192 convertion 대구광역시
Consumption.js:192 convertion 울산광역시
Consumption.js:192 convertion 인천광역시
Consumption.js:192 convertion 제주특별자치도
Consumption.js:192 convertion 전라북도
Consumption.js:192 convertion 경기도 */}

          {type == "map" ? (
            <div className={classes.container}>
              <div className={classes.containerSvg} id="svgContainer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="170 0 250 470"
                  className={classes.image}
                  ref={refSvg}
                >
                  <g
                    className={classes.imageEdge}
                    onClick={(e) => handelModal(e.target.id)}
                  >
                    <title>Layer 1</title>
                    {/* gangwon2 */}
                    <path
                      onClick={(e) => console.log(e.target.id)}
                      className={classes.single}
                      d="m255.29151,56.098632c0,0 11.659193,-7.174888 11.524633,-7.219708c-0.13456,-0.04482 14.035906,0.941681 13.901345,0.896861c-0.134561,-0.04482 16.726489,-9.372221 16.591928,-9.41704c-0.134561,-0.04482 5.515727,-11.614373 5.381166,-11.659193c-0.134561,-0.044819 10.896894,-6.681638 10.762332,-6.726457c-0.134562,-0.044819 7.30945,-0.403611 7.174888,-0.44843c-0.134562,-0.044819 4.618867,-8.475361 4.484305,-8.520179c-0.134562,-0.044819 12.690616,13.049304 12.556054,13.004484c-0.134563,-0.044819 29.730976,49.820606 29.596413,49.775785c-0.134564,-0.044821 16.278062,48.026885 16.143498,47.982063c-0.134564,-0.044823 11.793757,12.600877 11.659193,12.556054c-0.134565,-0.044823 -14.663642,21.121057 -14.798206,21.076233c-0.134564,-0.044824 -9.282477,-1.748898 -9.41704,-1.793722c-0.134564,-0.044824 -12.869921,0.493254 -13.004484,0.44843c-0.134563,-0.044824 -4.349742,4.977559 -4.484305,4.932735c-0.134563,-0.044824 -20.49324,0.044824 -20.627803,0c-0.134562,-0.044824 -3.452882,-9.372217 -3.587444,-9.41704c-0.134562,-0.044824 -8.385617,-3.54262 -8.520179,-3.587444c-0.134562,-0.044823 -8.385618,5.87442 -8.520179,5.829596c-0.134562,-0.044824 -11.973062,-3.09419 -12.107623,-3.139013c-0.134561,-0.044824 -2.107591,-21.03141 -2.242152,-21.076233c-0.134561,-0.044823 5.964158,-8.475357 5.829596,-8.520179c-0.134561,-0.044823 -7.040327,-8.475357 -7.174888,-8.520179c-0.134561,-0.044822 -6.143466,0.493253 -6.278027,0.44843c-0.134561,-0.044822 -6.143466,-17.443968 -6.278027,-17.488789c-0.134561,-0.044822 2.825144,-6.233205 2.690583,-6.278027c-0.134561,-0.044821 -11.973063,-21.031412 -12.107623,-21.076233c-0.13456,-0.044821 -7.488758,3.183834 -7.623318,3.139013c-0.13456,-0.044821 -11.524633,-15.201816 -11.524633,-15.201816z"
                      fill="none"
                      id="강원도"
                      stroke="gray"
                      stroke-width="3"
                    />

                    {/* gyeonggi3 */}
                    <path
                      onClick={() => console.log("MMMMMM")}
                      className={classes.single}
                      d="m254.394649,56.547063l-16.726488,9.37222l0,12.556054l-5.381166,7.623318l-2.690583,8.96861l-4.484305,-0.896861l-0.44843,8.071749l-1.345291,6.278027l6.278027,3.587444c0,0 12.690613,0.941683 13.139044,0.941683c0.448431,0 5.829597,-4.932736 5.695037,-4.977558c-0.13456,-0.044822 12.690614,-0.403608 12.556054,-0.44843c-0.13456,-0.044822 6.861018,14.843029 6.726457,14.798206c-0.13456,-0.044823 -3.004453,7.668141 -3.139013,7.623318c-0.13456,-0.044823 -9.282481,0.044823 -9.41704,0c-0.13456,-0.044823 -15.112078,-3.094191 -15.246637,-3.139013c-0.134559,-0.044823 -16.45737,21.121057 -16.591928,21.076233c-0.134559,-0.044823 2.376711,5.42599 2.242152,5.381166c-0.134559,-0.044824 -4.349746,6.771281 -4.484305,6.726457c-0.134559,-0.044824 9.103169,7.668143 8.96861,7.623318c-0.134559,-0.044824 7.757878,0.044824 8.206308,0.044824c0.448431,0 4.484305,5.829597 4.349746,5.784772c-0.134559,-0.044824 29.282542,-0.852037 29.147982,-0.896861c-0.13456,-0.044824 13.139045,-12.51123 13.004484,-12.556054c-0.134561,-0.044824 8.65474,0.044824 8.520179,0c-0.134561,-0.044824 5.964158,-9.820647 5.829596,-9.865471c-0.134561,-0.044824 -2.556022,-20.58298 -2.690583,-20.627803c-0.134561,-0.044823 7.309449,-8.026926 7.174888,-8.071749c-0.134561,-0.044823 -6.591896,-8.923788 -6.726457,-8.96861c-0.134561,-0.044822 -6.143466,1.390114 -6.278027,1.345291c-0.134561,-0.044822 -6.591897,-19.23769 -6.726457,-19.282511c-0.134561,-0.044822 3.273574,-5.784775 3.139013,-5.829596c-0.134561,-0.044821 -11.524632,-20.582982 -11.659193,-20.627803c-0.13456,-0.044821 -8.385619,3.632265 -8.520179,3.587444c-0.13456,-0.044821 -12.421494,-15.201816 -12.421494,-15.201816z"
                      fill="none"
                      id="경기도"
                      stroke="#000000"
                      stroke-width="3"
                    />

                    {/* incheon5 */}
                    <path
                      className={classes.single}
                      d="m224.349805,94.215225c0,0 -11.659193,-5.829597 -11.793752,-5.874418c-0.134558,-0.044821 -16.905801,9.461862 -17.040359,9.41704c-0.134558,-0.044822 -3.452886,14.394598 -3.587444,14.349776c-0.134558,-0.044822 22.107653,24.26007 21.973094,24.215247c-0.134558,-0.044823 12.242182,-3.542621 12.107623,-3.587444c-0.134559,-0.044823 4.170433,4.977559 4.035874,4.932735c-0.134559,-0.044823 10.896891,-10.717509 10.762332,-10.762332c-0.134559,-0.044823 -6.143468,-14.753384 -6.278027,-14.798206c-0.134559,-0.044822 -4.798177,0.493253 -4.798177,0.493253c0,0 -7.623319,-4.484305 -7.757877,-4.529127c-0.134559,-0.044822 2.376711,-13.856524 2.376711,-13.856524z"
                      fill="none"
                      id="인천광역시"
                      stroke="#000000"
                      stroke-width="3"
                    />

                    {/* seoul7 */}
                    <path
                      className={classes.single}
                      d="m234.663707,113.049307c0,0 5.381166,13.901346 5.381166,13.901346c0,0 13.901346,4.035875 13.901346,4.035875c0,0 9.865471,-0.448431 9.730911,-0.493253c-0.13456,-0.044823 4.170435,-8.026926 4.035874,-8.071749c-0.13456,-0.044823 -7.040328,-15.201815 -7.174888,-15.246637c-0.13456,-0.044822 -11.973064,0.044822 -12.107623,0c-0.13456,-0.044822 -6.143468,6.322849 -6.278027,6.278027c-0.134559,-0.044822 -7.488759,-0.403608 -7.488759,-0.403608z"
                      fill="none"
                      id="서울특별시"
                      stroke="#000000"
                      stroke-width="3"
                    />

                    {/* gyeongbuk9 */}
                    <path
                      className={classes.single}
                      d="m394.753399,138.161415c0,0 11.659193,43.049329 11.659193,43.049329c0,0 -4.932736,28.251122 -5.0673,28.206296c-0.134565,-0.044826 0.134565,35.022405 0.582995,35.022405c0.448431,0 12.107624,-8.071749 11.973059,-8.116576c-0.134565,-0.044827 -5.695031,44.439447 -5.695031,44.439447c0,0 -23.318386,-6.278027 -23.452951,-6.322855c-0.134564,-0.044828 -7.937185,10.35873 -8.071749,10.313901c-0.134564,-0.044828 -24.529114,-0.852033 -24.663677,-0.896861c-0.134563,-0.044828 10.448465,-27.309433 10.313901,-27.35426c-0.134563,-0.044827 -10.627769,-8.026922 -10.762332,-8.071749c-0.134563,-0.044827 -17.354227,10.807159 -17.488789,10.762332c-0.134562,-0.044827 -3.901312,22.017922 -4.035874,21.973094c-0.134562,-0.044828 -6.143465,0.493259 -6.278027,0.44843c-0.134562,-0.044828 -16.905797,-19.686114 -17.040359,-19.730942c-0.134562,-0.044827 -0.313869,-13.408088 -0.44843,-13.452915c-0.134562,-0.044827 10.000033,-8.923783 9.865471,-8.96861c-0.134562,-0.044827 1.928284,-12.062797 1.793722,-12.107623c-0.134562,-0.044826 -14.215214,-4.887909 -14.349776,-4.932735c-0.134561,-0.044826 -0.7623,-6.681632 -0.896861,-6.726457c-0.134561,-0.044826 2.376714,-14.753381 2.242152,-14.798206c-0.134561,-0.044825 18.520212,-23.721992 18.38565,-23.766816c-0.134562,-0.044824 18.520213,0.941685 18.38565,0.896861c-0.134563,-0.044825 17.174922,-22.376701 17.040359,-22.421525c-0.134563,-0.044824 21.210797,1.838546 21.210797,1.838546c0,0 14.798207,-19.282512 14.798207,-19.282512z"
                      fill="none"
                      id="경상북도"
                      stroke="#000000"
                      stroke-width="3"
                    />

                    {/* ulsan10 */}
                    <path
                      className={classes.single}
                      d="m407.309453,279.865456l-8.206314,31.793737l-10.762332,-8.071749l-13.004484,-8.96861l0.896861,-9.865471l7.623318,-9.865471l23.452951,4.977563z"
                      fill="none"
                      id="울산광역시"
                      stroke="#000000"
                      stroke-width="3"
                    />

                    {/* busan12 */}
                    <path
                      className={classes.single}
                      d="m399.237704,312.600883c0,0 -31.838566,25.560539 -31.97313,25.515709c-0.134564,-0.04483 -9.282477,-1.300462 -9.41704,-1.345291c-0.134563,-0.04483 -11.52463,3.632274 -11.659193,3.587444c-0.134563,-0.04483 -4.798173,-7.130058 -4.932735,-7.174888c-0.134563,-0.04483 12.690617,-8.026919 12.556054,-8.071749c-0.134563,-0.04483 8.206312,0.04483 8.071749,0c-0.134563,-0.04483 10.896896,-10.717503 10.762332,-10.762332c-0.134564,-0.044829 8.654743,-1.748893 8.520179,-1.793722c-0.134564,-0.044829 7.309452,-8.923781 7.174888,-8.96861c-0.134564,-0.044829 10.896897,9.013439 10.896897,9.013439z"
                      fill="none"
                      id="부산광역시"
                      stroke="#000000"
                      stroke-width="3"
                    />

                    {/* chungnam16 */}
                    <path
                      className={classes.single}
                      d="m219.417069,161.031372c0,0 -14.798207,2.242152 -14.932765,2.197328c-0.134558,-0.044824 -14.215218,30.986529 -14.349775,30.941704c-0.134558,-0.044825 12.242181,6.771283 12.107623,6.726457c-0.134558,-0.044825 -3.452886,13.049311 -3.587444,13.004485c-0.134558,-0.044826 6.412585,12.152449 6.412585,12.60088c0,0.44843 10.762332,0.896861 10.627774,0.852035c-0.134559,-0.044827 7.309446,8.565005 7.174888,8.520179c-0.134559,-0.044827 -4.349747,8.565006 -4.484305,8.520179c-0.134559,-0.044826 10.89689,3.632271 10.762332,3.587444c-0.134559,-0.044827 0.134558,5.425993 0,5.381166c-0.134559,-0.044827 10.896891,-2.197325 10.762331,-2.242152c-0.134559,-0.044827 7.757878,-12.062797 7.623319,-12.107624c-0.13456,-0.044826 5.515725,-0.403604 5.381166,-0.44843c-0.13456,-0.044827 1.03142,8.116576 0.896861,8.071749c-0.13456,-0.044827 8.206309,2.73541 8.071749,2.690583c-0.13456,-0.044827 1.928282,-4.439478 1.793722,-4.484305c-0.134561,-0.044827 10.000031,2.286979 9.86547,2.242152c-0.13456,-0.044827 1.031422,7.219715 0.896861,7.174888c-0.13456,-0.044827 13.587476,0.044827 13.452915,0c-0.134561,-0.044827 1.031422,-12.511227 0.896861,-12.556054c-0.134561,-0.044826 -33.946158,-20.134546 -34.080717,-20.179372c-0.13456,-0.044826 -3.452885,-11.614367 -3.587444,-11.659193c-0.13456,-0.044825 18.968641,-12.062798 18.83408,-12.107623c-0.13456,-0.044825 6.412588,-12.062799 6.278027,-12.107623c-0.13456,-0.044825 -4.798175,-12.51123 -4.932735,-12.556054c-0.13456,-0.044824 -30.358714,0.493255 -30.358714,0.493255c0,0 -4.035875,-5.829597 -4.170434,-5.874421c-0.134559,-0.044824 -7.93719,0.044824 -8.071749,0c-0.134559,-0.044824 -9.282482,-6.681633 -9.282482,-6.681633z"
                      fill="none"
                      id="충청남도"
                      stroke="#000000"
                      stroke-width="3"
                    />

                    {/* chungbuk18 */}
                    <path
                      className={classes.single}
                      d="m288.923799,248.47532c0,0 16.591929,0.896861 16.457367,0.852034c-0.134561,-0.044827 9.103172,-8.026922 8.96861,-8.071749c-0.134562,-0.044827 2.825145,-15.201811 2.690583,-15.246637c-0.134562,-0.044826 -13.766784,-3.991048 -13.901345,-4.035874c-0.134561,-0.044826 -1.659161,-7.130062 -1.793722,-7.174888c-0.134561,-0.044826 2.825144,-13.85652 2.690583,-13.901345c-0.134561,-0.044825 18.968643,-24.170422 18.834081,-24.215247c-0.134562,-0.044824 17.174921,1.390116 17.040359,1.345291c-0.134563,-0.044825 14.035908,-16.547104 13.901345,-16.591928c-0.134563,-0.044824 -20.941671,-0.852037 -21.076233,-0.896861c-0.134562,-0.044824 -3.452882,-8.475356 -3.587444,-8.520179c-0.134562,-0.044824 -8.385617,-3.54262 -8.520179,-3.587444c-0.134562,-0.044823 -8.385618,5.87442 -8.520179,5.829596c-0.134562,-0.044824 -12.869923,-4.439481 -13.004484,-4.484305c-0.134561,-0.044824 -6.143466,10.807156 -6.143466,10.807156c0,0 -8.96861,0 -9.103171,-0.044824c-0.134561,-0.044824 -12.421493,10.807156 -12.556054,10.762332c-0.13456,-0.044824 5.067296,12.152448 4.932735,12.107623c-0.13456,-0.044825 -6.591897,15.739892 -6.591897,15.739892c0,0 5.829597,5.829597 5.695036,5.784771c-0.13456,-0.044825 -8.385619,10.807158 -8.520179,10.762332c-0.13456,-0.044826 1.031421,13.497741 0.896861,13.452915c-0.13456,-0.044826 21.659225,11.704019 21.524664,11.659193c-0.134561,-0.044827 -0.31387,7.668145 -0.31387,7.668145z"
                      fill="none"
                      id="충청북도"
                      stroke="#000000"
                      stroke-width="3"
                    />

                    {/* jeonbuk19 */}
                    <path
                      className={classes.single}
                      d="m217.623348,245.336307l-1.031419,13.856518l7.623318,5.829596l-1.793722,9.865471l-8.520179,5.829596l-7.174888,15.246637l1.793722,10.313901l13.901345,3.139013l9.41704,-2.690583l0.44843,-5.381166l11.210762,-4.932735l0.896861,4.932735l17.93722,9.41704l23.318386,0l6.726457,-7.174888l-0.44843,-30.493274l13.901345,-9.865471l0.44843,-14.798206l-17.93722,-0.896861l-0.896861,6.278027l-13.452915,0.44843l-0.44843,-7.174888l-8.96861,-1.793722l-2.690583,4.035874l-8.071749,-3.139013l-1.345291,-8.071749l-4.484305,0.896861l-7.623318,11.659193c0,0 -11.973064,1.838549 -11.973064,1.838549c0,0 0.448431,-5.381166 0.313872,-5.425993c-0.134559,-0.044827 -11.076204,-1.748895 -11.076204,-1.748895z"
                      fill="none"
                      id="전라북도"
                      stroke="#000000"
                      stroke-width="3"
                    />

                    {/* jeonnam21 */}
                    <path
                      className={classes.single}
                      d="m209.103168,306.771286l-12.242182,16.098669l-10.313901,0.896861l-5.829596,12.107623l6.726457,11.659193l-14.349776,22.869955l11.210762,13.452915l-12.107623,21.524664l7.623318,9.41704l19.282511,-5.829596l3.587444,-11.210762l13.452915,-0.896861l4.932735,5.829596l38.565022,-1.345291l0,-4.484305l11.210762,-5.829596c0,0 6.412587,1.838554 6.861018,1.838554c0.448431,0 10.762332,-3.139014 10.627771,-3.183845c-0.134561,-0.044832 -1.210731,-11.165931 -1.345291,-11.210762c-0.134561,-0.044831 2.376713,-3.542613 2.242152,-3.587444c-0.134561,-0.044831 6.412588,4.529136 6.278027,4.484305c-0.134561,-0.044831 10.896893,-8.475348 10.762332,-8.520179c-0.134562,-0.044831 0.582992,-4.887904 0.44843,-4.932735c-0.134562,-0.044831 -10.627771,-20.582972 -10.762332,-20.627803c-0.134561,-0.04483 1.031422,-10.269071 0.896861,-10.313901c-0.134561,-0.04483 -9.73091,-25.067279 -9.865471,-25.112108c-0.134561,-0.044829 -24.977548,0.94169 -25.112108,0.896861c-0.13456,-0.044829 -17.80266,-8.475351 -17.93722,-8.520179c-0.134559,-0.044829 -0.313871,-5.336337 -0.44843,-5.381166c-0.134559,-0.044829 -11.076203,4.080703 -11.210762,4.035874c-0.134559,-0.044829 -1.210733,6.322856 -1.345291,6.278027c-0.134559,-0.044829 -7.93719,2.735412 -8.071749,2.690583c-0.134559,-0.044829 -13.766787,-3.094185 -13.766787,-3.094185z"
                      fill="none"
                      id="전라남도"
                      stroke="#000000"
                      stroke-width="3"
                    />

                    {/* gwangju22 */}
                    <path
                      className={classes.single}
                      d="m229.282541,318.87891c0,0 6.726458,-4.484305 6.591899,-4.529134c-0.134559,-0.044829 11.345322,-1.300462 11.210762,-1.345291c-0.13456,-0.044829 10.000031,10.358731 9.865471,10.313901c-0.13456,-0.044829 -7.937189,11.255592 -8.071749,11.210762c-0.13456,-0.04483 -5.695037,-1.748892 -5.829596,-1.793722c-0.134559,-0.04483 -5.246607,2.286982 -5.381166,2.242152c-0.134559,-0.04483 -8.834051,-4.439475 -8.96861,-4.484305c-0.134559,-0.04483 0.582989,-11.614363 0.582989,-11.614363z"
                      fill="none"
                      id="광주광역시"
                      stroke="#000000"
                      stroke-width="3"
                    />

                    {/* jeju24 */}
                    <path
                      className={classes.single}
                      d="m202.825141,435.022412l27.668133,-6.771291l8.071749,-6.726457l14.349776,14.798206l-3.139013,17.93722l-20.627803,9.41704l-29.596413,-1.345291l-8.520179,-12.107623l11.793751,-15.201803z"
                      fill="none"
                      id="제주특별자치도"
                      stroke="#000000"
                      stroke-width="3"
                    />

                    {/* daejeon29 */}
                    <path
                      className={classes.single}
                      d="m251.255636,209.910296c0,0 17.040359,2.690583 16.905799,2.645757c-0.13456,-0.044826 -0.762301,3.183839 -0.896861,3.139013c-0.13456,-0.044826 0.582991,13.049311 0.44843,13.004484c-0.13456,-0.044826 -12.869925,-7.130062 -13.004484,-7.174888c-0.13456,-0.044826 -3.452884,-11.614367 -3.452884,-11.614367z"
                      fill="none"
                      id="대전광역시"
                      stroke="#000000"
                      stroke-width="3"
                    />

                    {/* sejong30 */}
                    <path
                      className={classes.single}
                      d="m252.152497,209.910296c0,0 17.48879,-12.107624 17.35423,-12.152449c-0.13456,-0.044825 5.515726,6.771283 5.381166,6.726457c-0.13456,-0.044825 -6.143467,8.565005 -6.278027,8.520179c-0.13456,-0.044826 -16.457369,-3.094188 -16.457369,-3.094188z"
                      fill="none"
                      id="세종특별자치시"
                      stroke="#000000"
                      stroke-width="3"
                    />

                    {/* daegu31 */}
                    <path
                      className={classes.single}
                      d="m330.179405,281.210747c0,0 21.524664,2.690583 21.390101,2.645755c-0.134563,-0.044828 10.896895,-25.964141 10.762332,-26.008969c-0.134563,-0.044827 -10.179338,-8.475352 -10.313901,-8.520179c-0.134563,-0.044827 -18.699518,10.358729 -18.834081,10.313901c-0.134562,-0.044827 -3.004451,21.569492 -3.004451,21.569492z"
                      fill="none"
                      id="대구광역시"
                      stroke="#000000"
                      stroke-width="3"
                    />

                    {/* gyeongnam32 */}
                    <path
                      className={classes.single}
                      d="m306.861019,262.825096c0,0 17.48879,19.282512 17.354228,19.237684c-0.134562,-0.044828 6.412589,-0.852033 6.278027,-0.896861c-0.134562,-0.044828 20.762366,2.735411 20.627803,2.690583c-0.134563,-0.044828 25.246672,1.39012 25.112108,1.345291c-0.134564,-0.044828 -1.659158,8.565008 -1.793722,8.520179c-0.134564,-0.044828 13.587479,10.807161 13.452915,10.762332c-0.134564,-0.044829 -6.591893,8.116578 -6.726457,8.071749c-0.134564,-0.044829 -9.282477,1.390121 -9.41704,1.345291c-0.134564,-0.044829 -9.730907,11.255592 -9.865471,11.210762c-0.134563,-0.04483 -8.385616,0.04483 -8.520179,0c-0.134563,-0.04483 -11.973061,7.219718 -12.107623,7.174888c-0.134563,-0.04483 4.618868,8.116579 4.484305,8.071749c-0.134563,-0.04483 12.242187,-3.542614 12.107623,-3.587444c-0.134563,-0.04483 8.654743,0.941691 8.520179,0.896861c-0.134564,-0.04483 0.134564,9.01344 0,8.96861c-0.134564,-0.04483 -17.802657,18.430481 -17.93722,18.38565c-0.134563,-0.044831 -19.147949,-5.784766 -19.282511,-5.829596c-0.134562,-0.044831 -5.246604,7.668149 -5.381166,7.623318c-0.134562,-0.044831 -7.488757,4.977567 -7.623318,4.932735c-0.134562,-0.044831 -9.282479,-5.784765 -9.41704,-5.829596c-0.134562,-0.044831 -11.076201,-20.134542 -11.210762,-20.179372c-0.134561,-0.04483 1.928283,-11.165932 1.793722,-11.210762c-0.134561,-0.04483 -10.627771,-24.618848 -10.762332,-24.663677c-0.134561,-0.044829 5.964157,-5.784768 5.829596,-5.829596c-0.134561,-0.044829 -0.313869,-30.896876 -0.44843,-30.941704c-0.134561,-0.044828 14.932768,-10.269074 14.932768,-10.269074z"
                      fill="none"
                      id="경상남도"
                      stroke="#000000"
                      stroke-width="3"
                    />
                  </g>
                </svg>

                {metroPower.map((item, index) => (
                  <button
                    id={item.metro}
                    style={{
                      backgroundColor: `hsla(0, 100%, ${71 + index * 0.7}%, 1)`,
                    }}
                    className={classes.button}
                  >
                    {metroPro(item.metro)}:{Math.round(item.powerUsage)}kWh
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <Table highlightOnHover>
                <thead className={classes.header}>
                  <tr>
                    <th>Number</th>
                    <th>Metro</th>
                    <th>Energy use</th>
                  </tr>
                </thead>

                <tbody>{rows}</tbody>
              </Table>
            </div>
          )}
        </Card>
      </Container>
    </>
  );
};

export default Consumption;

// {metroPower.filter(item=>item.metro=="강원").}
