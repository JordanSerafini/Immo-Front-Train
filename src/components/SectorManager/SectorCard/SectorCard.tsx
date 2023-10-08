// React
import { useState } from 'react';

// Redux
import { useAppSelector } from '../../../hooks/redux';

// Selectors
import { findCollaborator } from '../../../store/selectors/collaborator';

// Components
import AttributionForm from './AttributionForm';
import ColorForm from './ColorForm';

// Assets
import pencilIcon from '../../../assets/icons/edit-pencil.svg';

// Typescript interface
import { Sector } from '../../../@types/sector';

export default function SectorCard({
  id,
  city,
  code_zip,
  color_code,
  collaborator_id,
  label,
}: Sector) {
  // Local State
  const [editingAffectation, setEditingAffection] = useState<boolean>(false);
  const [editingColor, setEditingColor] = useState<boolean>(false);

  // Selector
  const collaborator = useAppSelector(findCollaborator(collaborator_id));

  let content: string;

  if (!collaborator) {
    content = 'Aucun collaborateur...';
  } else {
    content = `${
      collaborator.firstname
    } ${collaborator.lastname?.toUpperCase()}`;
  }

  // handlers
  const affectSector = () => {
    setEditingAffection(!editingAffectation);
  };

  const editColor = () => {
    setEditingColor(!editingColor);
  };

  return (
    <article className="grid items-center justify-center grid-cols-2 gap-8 p-5 my-5 rounded-lg lg:grid-cols-4 bg-secondary-50 shadow-custom">
      <div className="flex flex-col items-center gap-4">
        <h3>Ville</h3>
        <p className="text-center">{city.toUpperCase()}</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-center">Code Postal</h3>
        <p className="text-center">{code_zip}</p>
      </div>

      <div className="relative flex flex-col items-center gap-4">
        <h3 className="flex gap-2 text-center">
          Attribué à
          <button type="button" onClick={affectSector}>
            <img src={pencilIcon} alt="Pencil Icon" />
          </button>
        </h3>
        <p className="text-center">{content}</p>

        {editingAffectation && (
          <AttributionForm
            id={id}
            city={city}
            code_zip={code_zip}
            color_code={color_code}
            label={label}
            setState={setEditingAffection}
            collaborator_id={collaborator_id}
          />
        )}
      </div>

      <div className="relative flex flex-col items-center gap-4">
        <h3 className="flex gap-2">
          Couleur
          <button type="button" onClick={editColor}>
            <img src={pencilIcon} alt="Pencil Icon" />
          </button>
        </h3>
        <div
          className="w-[50px] aspect-square rounded-full shadow-custom"
          style={{ backgroundColor: color_code }}
        />

        {editingColor && (
          <ColorForm
            id={id}
            city={city}
            code_zip={code_zip}
            color_code={color_code}
            label={label}
            setState={setEditingColor}
            collaborator_id={collaborator_id}
          />
        )}
      </div>
    </article>
  );
}
