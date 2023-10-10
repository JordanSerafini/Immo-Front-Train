// React
import { FormEvent, SetStateAction, useState } from 'react';

// Redux
import { useAppSelector, useAppDispatch } from '../../../../hooks/redux';

// Reducers
import { editSector } from '../../../../store/reducers/sector';

// Components
import ValidButton from '../../Buttons/ValidButton';

// Typescript interface
import { Sector } from '../../../../@types/sector';

// Style
import "./styles/animation.scss";

export default function AttributionForm({
  id,
  city,
  code_zip,
  color_code,
  label,
  setState
}: Sector & { setState: React.Dispatch<SetStateAction<boolean>>}) {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Selector
  const collaborators = useAppSelector((state) => state.collaborator.data);

  // Local State
  const [selectedOption, setSelectedOption] = useState<string>('3');

  // Handlers
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

  const closeEditForm = () => {
    setState(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute z-10 flex flex-col w-full gap-2 p-6 pt-8 rounded-lg -top-3/4 shadow-custom bg-secondary-50 animate__fadeIn"
    >
      <button
        onClick={closeEditForm}
        type="button"
        className="bg-red-500 rounded-full w-[20px] h-[20px]  text-secondary-50 absolute top-2 right-2 flex justify-center items-center hover:bg-red-600 duration-150"
      >
        X
      </button>

      <label>
        Sélectionnez un négociateur :
        <select
          value={selectedOption}
          onChange={handleChange}
          className="w-full p-2 my-2 rounded-md focus:ring-2"
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
