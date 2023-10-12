// === REACT === //
import { FormEvent, SetStateAction, useState } from 'react';

// === REDUX HOOKS === //
import { useAppSelector, useAppDispatch } from '../../../../hooks/redux';

// === REDUCERS === //
import { editSector } from '../../../../store/reducers/sector';

// === COMPONENTS === //
import DeleteButton from '../../Buttons/DeleteButton';
import ValidButton from '../../Buttons/ValidButton';

// === STYLES === //
import './styles/animation.scss';

// === TYPESCRIPT === //
import { Sector } from '../../../../@types/sector';

export default function AttributionForm({
  id,
  city,
  code_zip,
  color_code,
  label,
  setState,
}: Sector & { setState: React.Dispatch<SetStateAction<boolean>> }) {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REDUX STATES === //
  const collaborators = useAppSelector((state) => state.collaborator.data);

  // === LOCAL STATES === //
  const [selectedOption, setSelectedOption] = useState<string>('3');

  // === HANDLERS === //
  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      id,
      city,
      code_zip,
      color_code,
      label,
      collaborator_id: parseInt(selectedOption, 10),
    };

    dispatch(editSector(formData));
    setState(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute z-10 flex flex-col w-full gap-2 p-6 pt-8 rounded-lg -top-3/4 shadow-custom bg-secondary-50 animate__fadeIn"
    >
      <DeleteButton
        className="absolute top-2 right-2"
        onClickMethod={() => setState(false)}
      />

      <label>
        Sélectionnez un négociateur :
        <select
          name="collaborator_selected"
          value={selectedOption}
          onChange={handleChange}
          className="w-full p-2 my-2 rounded-md focus:ring-2 ring-accent-300"
        >
          <option disabled> Sélectionnez...</option>
          {collaborators.map((collab) => (
            <option key={collab.id} value={collab.id}>
              {collab.firstname} {collab.lastname?.toUpperCase()}
            </option>
          ))}
        </select>
      </label>

      <ValidButton isSubmit content="Valider" />
    </form>
  );
}
