// Library
import {
  Chart as ChartJS,
  ArcElement,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Redux
import { useAppSelector } from '../../../hooks/redux';

// Utils
import generateRandomColor from '../../../utils/generateRandomColors';

ChartJS.register(
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function BarInfoInterval() {
  const stats = useAppSelector((state) => state.stats.dataInterval);

  const data = {
    labels: stats.map(
      (stat) => `${stat.firstname} ${stat.lastname.toUpperCase()}`
    ),
    datasets: [
      {
        label: 'Meilleur collaborateur',
        data: stats.map((stat) => stat.nb_infos),
        backgroundColor: stats.map(() => generateRandomColor()),
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
}
