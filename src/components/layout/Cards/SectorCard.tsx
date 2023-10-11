// === REACT === //
import { useState } from 'react';

// === REDUX HOOKS === //
import { useAppSelector } from '../../../hooks/redux';

// === SELECTORS === //
import { findCollaborator } from '../../../store/selectors/collaborator';

// === COMPONENTS === //
import AttributionForm from '../../common/Forms/SectorForm/AttributionForm';
import ColorForm from '../../common/Forms/SectorForm/ColorForm';

// === ASSETS === //
import { editPencilIcon } from '../../../assets';

// === TYPESCRIPT === //
import { Sector } from '../../../@types/sector';

export default function SectorCard({
  id,
  city,
  code_zip,
  color_code,
  collaborator_id,
  label,
}: Sector) {
  // === SELECTOR === //
  const collaborator = useAppSelector(findCollaborator(collaborator_id));

  // === LOCAL STATES === //
  const [editingAffectation, setEditingAffection] = useState<boolean>(false);
  const [editingColor, setEditingColor] = useState<boolean>(false);

  let content: string;

  if (!collaborator) {
    content = 'Aucun collaborateur...';
  } else {
    content = `${
      collaborator.firstname
    } ${collaborator.lastname?.toUpperCase()}`;
  }

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
          <button type="button" onClick={() => setEditingAffection(!editingAffectation)}>
            <img src={editPencilIcon} alt="Pencil Icon" />
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
          <button type="button" onClick={() => setEditingColor(!editingColor)}>
            <img src={editPencilIcon} alt="Pencil Icon" />
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
