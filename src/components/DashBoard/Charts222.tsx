import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { BarController, CategoryScale, LinearScale, BarElement, PieElement } from 'chart.js';

Chart.register(BarController, CategoryScale, LinearScale, BarElement);

export default function BarChart() {
    const [chartData, setChartData] = useState(null);

    async function handleClick() {
        let response = await fetch('http://localhost:5000/informationsAll');
        let newData = await response.json();

        let tempCollaboratorsData = {};

        newData.forEach(info => {
            const collaboratorName = `${info.firstname} ${info.lastname}`;

            if (!tempCollaboratorsData[collaboratorName]) {
                tempCollaboratorsData[collaboratorName] = 0;
            }
            tempCollaboratorsData[collaboratorName]++;
            console.log(tempCollaboratorsData);
        });

        const collaboratorNames = Object.keys(tempCollaboratorsData);
        const infoCounts = Object.values(tempCollaboratorsData);

        const randomColors = collaboratorNames.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`);

        const dataForChart = {
            labels: collaboratorNames,
            datasets: [{
                label: 'Nombre d\'informations', 
                data: infoCounts,
                backgroundColor: randomColors,
                borderColor: randomColors.map(color => color.replace('0.6', '1')),
                borderWidth: 1
            }]
        };

        setChartData(dataForChart);
    }

    const options = {
        title: {
            display: true,
            text: 'Nombre d\'informations par collaborateur',
            fontSize: 24
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div>
            {chartData && <Pie data={chartData} options={options} />}
            <button onClick={handleClick}>Charger les données</button>
        </div>
    );
};
