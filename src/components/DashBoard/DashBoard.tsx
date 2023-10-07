import BarChart from "./Charts222";
import BarChartCollaboratorComponent from "./ChartsBarCollaboratorDashboard";
import BarChartSectorComponent from "./ChartsBarSectorDashboard"

export default function DashBoard() {
  return (
    <>
      <h1 className="mt-20 mb-5 lg:mt-10">Dashboard</h1>

      <section className="block mt-[30vh]">
        <h2 className="text-center">Dashboard incoming with ChartJS</h2>
      </section>
      <div className="flex">
        <div className="w-1/2">
          <BarChartCollaboratorComponent />
        </div>
        <div className="w-1/2">
          {/* Ici, vous pouvez ajouter un autre contenu ou le laisser vide pour l'instant */}
          <BarChartSectorComponent />
        </div>
      </div>
    </>
  );
}
