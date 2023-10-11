// === LIBRARY === //
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LegendOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// === REDUX HOOKS === //
import { useAppSelector } from '../../../../hooks/redux';

// === UTILS === //
import generateRandomColor from '../../../../utils/generateRandomColors';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutInfoCollaborator() {
  // === REDUX STATES === //
  const stats = useAppSelector((state) => state.stats.dataCollabs);

  const data = {
    labels: stats.map(
      (stat) => `${stat.firstname} ${stat.lastname.toUpperCase()}`
    ),
    datasets: [
      {
        data: stats.map((stat) => stat.nb_infos),
        backgroundColor: stats.map(() => generateRandomColor()),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right' as LegendOptions<'doughnut'>['position'],
      },
    },
  };

  return (
    <Doughnut
      className="max-w-[100%] md:max-w-[20vw] md:max-h-[20vw] m-auto"
      data={data}
      width="200px"
      height="200px"
      options={options}
    />
  );
}
