import React from 'react'

import {Bar} from 'react-chartjs-2'
// import { Chart as ChartJS } from 'chart.js/auto'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

// defaults.global.tooltips.enabled = false;

const BarChart = ({data})=>{

    
    return <div>
        {/* {data.map((v)=><li>{v.label}</li>)} */}
        <Bar 
        data={{
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'votes',
                data: [10, 2, 4, 5,6,7],
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
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
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        }
                    }
                ]
            }
        }}
        />
    </div>
}

export default BarChart