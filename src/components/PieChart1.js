import React from 'react'


import {Pie, Line} from 'react-chartjs-2'
// import { Chart as ChartJS } from 'chart.js/auto'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,//for pie chart
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,//for pie chart
    LineElement,//for line chart
    PointElement,//for line chart
    Title,
    Tooltip,
    Legend
  );

// defaults.global.tooltips.enabled = false;

const PieChart = ({data})=>{

    
    return <div>
        
        {/* {data.map((v)=><li>{v.label}</li>)} */}
        <Line
        data={{
            labels: data.map((v)=>v.label),//
            datasets: [{
                label: 'number of plants',
                data: data.map((v)=>v.value),//
                backgroundColor: 
                ["#54bebe", "#76c8c8", "#98d1d1", "#badbdb", "#dedad2", "#e4bcad", "#df979e", "#d7658b", "#c80064"]
              
            }]
        }}
        height={400}
        width={600}
        options={{
            plugins:{
            title: {
                display: true,
                text: 'my bar chart',
            },
        },
            maintainAspectRatio:false,
            
        }}
        />
    </div>
}

export default PieChart