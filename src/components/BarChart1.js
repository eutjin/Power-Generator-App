import React from 'react'

import {Bar} from 'react-chartjs-2'
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
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, zoomPlugin
  );

// defaults.global.tooltips.enabled = false;

const BarChart = ({data})=>{

    const resetZoom1=()=>{
       Bar.resetZoom();
    }

    return <> <div>
        {/* {data.map((v)=><li>{v.label}</li>)} */}
        <Bar 
        data={{
            labels: data.map((v)=>v.label),//
            datasets: [{
                label: 'generation capacity',
                data: data.map((v)=>v.capacity),//
                backgroundColor: [
                'black'
              ],
              
            }]
        }}
        height={400}
        width={600}
        options={{
            // indexAxis: 'y',
            plugins: {
                zoom: {
                  zoom: {
                    wheel: {
                      enabled: true,
                    },
                    pinch: {
                      enabled: true
                    },
                    mode: 'y',
                  }
                }
            },
        //     plugins:{
        //     title: {
        //         display: true,
        //         text: 'my bar chart',
        //     },
        // },
            maintainAspectRatio:false,
            scales: {
                yAxes: 
                    {
                        title: {
                            display: true,
                            text: '(MW)',
                            align: 'center',
                            font: {
                                    size: 15
                                    }
                        },
                        ticks: {
                            beginAtZero: true,
                        }
                    }
                    
                    }
        }}
        />
        
    </div>
    <button onClick={()=> console.dir("nice")}>test</button>
    </>
}

export default BarChart