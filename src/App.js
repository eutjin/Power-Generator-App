import React, {useState, useEffect, useRef} from 'react'
import './App.css';
import data from './data'
import BarChart1 from './components/BarChart1';
import BarChart2 from './components/BarChart2';
import BarChart3 from './components/BarChart3';
import PieChart1 from './components/PieChart1';
import { Button, SimpleGrid, Paper, Text, Container } from '@mantine/core';

function App() {
  const [data1, setData1]= useState(data)
  console.log(data1)

  let fuel= data1.reduce((total, item)=>{
    const {fuel, pcap}= item;
    // console.log(fuel)
    if(!fuel) return total;
    if(!total[fuel]){
      total[fuel]={label: fuel, value: 1, capacity: pcap}
    }else{
      total[fuel]={...total[fuel], value: total[fuel].value+1, capacity: total[fuel].capacity+pcap}
    }
    return total;
  }, {})

  const mostFuel=Object.values(fuel).sort((a,b)=>{return b.value-a.value;})//number of plants grouped by fuel type
  console.log(mostFuel)
  const mostFuelCap=Object.values(fuel).sort((a,b)=>{return b.capacity-a.capacity;})//power plant generation capacity grouped by capacity
  console.log(mostFuelCap)

  //largest generation facility for each fuel type
  let largestByFuel= data1.reduce((total, item, index)=>{
    const {fuel, pcap}= item;
    // console.log(fuel)
    if(!fuel) return total;
    if(!total[fuel]){
      total[fuel]={label: fuel, capacity: pcap}
    
    }else if(pcap>total[fuel].capacity){
        total[fuel]={...total[fuel], capacity: pcap}
        console.log('yes')
      }
    
    return total;
  }, {})
  console.log(largestByFuel)

  let genSource= data1.reduce((total, item)=>{
    const {genSrc, pcap}= item;
    // console.log(fuel)
    if(!genSrc) return total;
    if(!total[genSrc]){
      total[genSrc]={label: genSrc, value: 1, capacity: pcap}
    }else{
      total[genSrc]={...total[genSrc], value: total[genSrc].value+1, capacity: total[genSrc].capacity+pcap}
    }
    return total;
  }, {})
  console.log(genSource)

  //total number of power plants in Korea
  let totalPlant= data1.length 

  //total capacity of all power plants in korea
  let totalCapacity= Math.round(mostFuelCap.reduce((total, item)=>{
    total +=item.capacity //john smilga

    return total;
  }, 0))
  console.log(totalCapacity)

  //total capacity of renewable energy
  let totalRenCapacity= mostFuelCap.reduce((total, item)=>{
    if((item.label==="태양광")||(item.label==="원자력")||(item.label==="부생가스")||(item.label==="수력")||(item.label==="풍력")||(item.label==="바이오매스")||(item.label==="해양에너지")){
      total +=item.capacity
    }
    return total;
  }, 0)
  console.log(totalRenCapacity)

  let energySummary= mostFuelCap.map((v)=>{ return v.label})
  console.log(energySummary)
  

  //check number of companies
  let company= data1.reduce((total, item)=>{
    const {company}= item;
    // console.log(fuel)

    if(!company) return total;
    if(!total[company]){
      total[company]={label: company, value: 1}
    }else{
      total[company]={...total[company], value: total[company].value+1}
    }

    return total;
  }, {})
  // console.log(company)
  const mostCompany=Object.values(company).sort((a,b)=>{return b.value-a.value})
  console.log(mostCompany)//number of plants owned by each company
  const mostCompanyTop= mostCompany.slice(0,25);
  console.log(mostCompanyTop)

  //area: not needed as it divides into ony 3 types (urban, non-urban, Jeju)
  let area= data1.reduce((total, item)=>{
    const {area}= item;
    // console.log(fuel)
    if(!area) return total;
    if(!total[area]){
      total[area]={label: area, value: 1}
    }else{
      total[area]={...total[area], value: total[area].value+1}
    }
    return total;
  }, {})
  console.log(area)

  return (
    <main>
      <section>
      <Container size={1140} px={0}>
        <SimpleGrid cols={3}>
          <div>
          
            <Paper shadow="md" radius="md" p="md">
              <Text>1</Text>
            </Paper>
            
          </div>
          <div>
            <Paper shadow="md" radius="md" p="md">
              <Text>2</Text>
            </Paper>
          </div>
          <div>
            <Paper shadow="md" radius="md" p="md">
              <Text>3</Text>
            </Paper>
          </div>
          
        </SimpleGrid>
        </Container>
        <div>
          <Button
            onClick={() => {
              console.log("nice");
            }}
          >
            Hello worlds!
          </Button>
        </div>
        
        <div>
        <Container size={1140} px={0}>
        <Paper shadow="md" radius="md" p="md">
          <BarChart1 data={mostFuelCap} />
        </Paper>
        </Container>
        </div>
        <div>
          <BarChart2 data={mostFuel} />
        </div>
        <div>
          <BarChart3 data={mostCompanyTop} />
        </div>
        <div>
          <PieChart1 data={mostCompanyTop} />
        </div>
      </section>
    </main>
  );
}

export default App;
