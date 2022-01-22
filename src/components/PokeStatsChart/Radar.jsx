import{
    Chart as ChartJS, registerables
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
  
ChartJS.register(
...registerables
);

export const PokeStatsChart = ({ stats }) => {
    const reduced = stats.datasets.reduce((acc,curr) => [...acc,...curr.data],[]);

    const plugins = {
        legend: {
            display: false,
        },
        datalabels: {
            backgroundColor: function(context) {
                return context.dataset.borderColor;
            },
            color: 'black',
            font: {
                weight: 'bold'
            },
            formatter: Math.round,
            padding: 8
        }  
    };


    const options = {      
        responsive: true,
        maintainAspectRatio: true,
        plugins: plugins,
        scales: {
            r: {
                ticks: {
                    maxTicksLimit: 1,                                    
                    // display: true,
                    beginAtZero: true,                    
                    showLabelBackdrop: false,
                    min: 0,
                    max: (Math.max(...reduced) + 20),
                    stepSize: 100,
                },
                angleLines: {
                    display: true,
                    color: "#A8A8A8",
                    lineWidth: 1
                },
                gridLines: {
                    display: false,
                    color: "#000",
                    circular: true
                }
            },
            
        },
    };

    return (
        <div>
            <Radar
                data={ stats }
                options={ options }
            />
        </div>
    );
}