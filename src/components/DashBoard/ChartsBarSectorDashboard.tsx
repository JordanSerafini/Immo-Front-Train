import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

import { Chart } from 'chart.js';
import { BarController, PieController, CategoryScale, LinearScale, BarElement, ArcElement } from 'chart.js';
import EditLastname from '../Profile/EditLastname/EditLastname';

Chart.register(BarController, PieController, CategoryScale, LinearScale, BarElement, ArcElement);

export default function BarChartSectorComponent() {
  
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/stats/informations/sectors');
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const newData = await response.json();
  
        const newLabels = [];
        const newValues = [];
  
      newData.forEach(element => {
        const label = element.label
        const value = element.nb_infos
        newLabels.push(label)
        newValues.push(value)
  
      });
  
      setLabels(newLabels);
      setValues(newValues);
        
  
      
      } catch (error) {
        console.error("Il y a eu un problème avec l'opération fetch: ", error.message);
      }
    }
    fetchData();
  }, [])
  


  const data = {
    labels: labels,
    datasets: [
      {
        label: labels,
        data: values,
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

  return <Doughnut data={data} options={options}  />;
}

