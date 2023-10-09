// Library
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Redux
import { useAppSelector } from '../../../hooks/redux';

// Utils
import generateRandomColor from '../../../utils/generateRandomColors';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function DonutInfoCollaborator() {
  const stats = useAppSelector((state) => state.stats.dataCollabs);

  const data = {
    labels: stats.map((stat) => `${stat.firstname} ${stat.lastname.toUpperCase()}`),
    datasets: [
      {
        data: stats.map((stat) => stat.nb_infos),
        backgroundColor: stats.map(() => generateRandomColor()),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Doughnut
      className="max-w-[100%] m-auto"
      data={data}
      width="200px"
      height="200px"
    />
  )
}