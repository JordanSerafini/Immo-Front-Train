// React
import { FormEvent, SetStateAction, useState } from 'react';

// Redux
import { useAppDispatch } from '../../../hooks/redux';

// Reducers
import { editSector } from '../../../store/reducers/sector';

// Components
import ValidButton from '../../SharedComponents/Buttons/ValidButton';

// Typescript interface
import { Sector } from '../../../@types/sector';

export default function ColorForm({
  id,
  city,
  code_zip,
  collaborator_id,
  label,
  setState,
}: Sector & { setState: React.Dispatch<SetStateAction<boolean>> }) {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Local State
  const [color, setColor] = useState<string>('3');

  // Handlers
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      id,
      city,
      code_zip,
      color_code: color,
      label,
      collaborator_id,
    };

    dispatch(editSector(formData));
    setState(false);
  };

  const closeEditForm = () => {
    setState(false);
  };

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setColor(event.target.value);
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

      <input className='block w-1/2 m-auto' type="color" value={color} onChange={handleChange} />

      <ValidButton isSubmit content="Valider" />
    </form>
  );
}
