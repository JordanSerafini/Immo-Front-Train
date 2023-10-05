import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

import { Chart } from 'chart.js';
import { BarController, PieController, CategoryScale, LinearScale, BarElement, ArcElement } from 'chart.js';
import EditLastname from '../Profile/EditLastname/EditLastname';

Chart.register(BarController, PieController, CategoryScale, LinearScale, BarElement, ArcElement);

export default function BarChartComponent() {
  
  let labelArray = [];
  let valueArray = [];
  
  async function handleClick() {
    try {
      const response = await fetch('http://localhost:5000/stats/informations');
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const newData = await response.json();

    //const name = newData[0].firstname/Lastname
    newData.forEach(element => {
      const name = `${element.firstname} ${element.Lastname}`
      const value = element.nb_biens
      labelArray.push(name)
      valueArray.push(value)

    });
      

    
    } catch (error) {
      console.error("Il y a eu un problème avec l'opération fetch: ", error.message);
    }
  }

  const data = {
    labels: labelArray,
    datasets: [
      {
        label: 'Ventes',
        data: valueArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  return <Bar data={data} options={options} onClick={handleClick}  />;
}

