import React, { useState } from 'react';


import BarChartCollaboratorComponent from "./ChartsBarCollaboratorDashboard";
import BarChartSectorComponent from "./ChartsBarSectorDashboard";
import BarChartDateComponent from "./ChartsBarDateDashboard";
import ValidButton from "../SharedComponents/Buttons/ValidButton";



export default function DashBoard() {

  const [activeButton, setActiveButton] = useState(null);

  // Fonction pour gérer le clic sur un bouton
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <h1 className="mt-20 mb-5 lg:mt-10">Dashboard</h1>
      <div className="max-w-[400px] w-full mx-auto mt-20 text-center flex space-x-4">
        {/* Utilisez handleButtonClick pour définir activeButton au nom du bouton cliqué */}
        <ValidButton
          content="Classement des collaborateurs"
          isSubmit
          className={`w-full mt-10 ${activeButton === 'collaborateurs' ? 'bg-blue-500 text-white' : ''}`}
          onClickMethod={() => handleButtonClick('collaborateurs')}
        />

        <ValidButton
          content="Classement des secteurs"
          isSubmit
          className={`w-full mt-10 ${activeButton === 'secteurs' ? 'bg-blue-500 text-white' : ''}`}
          onClickMethod={() => handleButtonClick('secteurs')}
        />

        <ValidButton
          content="Classement des collaborateurs entre deux dates"
          isSubmit
          className={`w-full mt-10 ${activeButton === 'date' ? 'bg-blue-500 text-white' : ''}`}
          onClickMethod={() => handleButtonClick('date')}
        />
      </div>

      <div className="p-4 my-5 overflow-x-hidden rounded-lg min-h-[40vh] shadow-custom bg-secondary-50">
        <div className="">
          {/* Affichez BarChartCollaboratorComponent si activeButton est "collaborateurs" */}
          {activeButton === 'collaborateurs' && <BarChartCollaboratorComponent />}
        </div>
        <div className="">
          {/* Affichez BarChartSectorComponent si activeButton est "secteurs" */}
          {activeButton === 'secteurs' && <BarChartSectorComponent />}
        </div>
        <div className="">
          {/* Affichez BarChartSectorComponent si activeButton est "secteurs" */}
          {activeButton === 'date' && <BarChartDateComponent />}
        </div>
      </div>
    </>
  );
}
