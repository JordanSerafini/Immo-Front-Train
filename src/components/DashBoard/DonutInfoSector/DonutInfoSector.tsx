// Library
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Redux
import { useAppSelector } from '../../../hooks/redux';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutInfoSector() {
  // Redux state
  const stats = useAppSelector((state) => state.stats.dataSector);

  const data = {
    labels: stats.map((stat) => stat.label),
    datasets: [
      {
        data: stats.map((stat) => stat.nb_infos),
        backgroundColor: stats.map((stat) => `${stat.color_code}30`),
        borderColor: stats.map((stat) => stat.color_code),
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
  );
}
