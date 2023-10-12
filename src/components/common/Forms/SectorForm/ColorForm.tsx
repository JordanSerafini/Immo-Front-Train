// === REACT === //
import { FormEvent, SetStateAction, useState } from 'react';

// === REDUX HOOKS === //
import { useAppDispatch } from '../../../../hooks/redux';

// === REDUCERS === //
import { editSector } from '../../../../store/reducers/sector';

// === COMPONENTS === //
import DeleteButton from '../../Buttons/DeleteButton';
import ValidButton from '../../Buttons/ValidButton';

// === TYPESCRIPT === //
import { Sector } from '../../../../@types/sector';

export default function ColorForm({
  id,
  city,
  code_zip,
  collaborator_id,
  label,
  setState,
}: Sector & { setState: React.Dispatch<SetStateAction<boolean>> }) {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === CONTROLLED INPUT STATES === //
  const [color, setColor] = useState<string>('3');

  // === HANDLERS === //
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

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setColor(event.target.value);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="absolute z-10 flex flex-col w-full gap-2 p-6 pt-8 rounded-lg -top-2/4 shadow-custom bg-secondary-50 animate__fadeIn"
    >
      <DeleteButton className='absolute top-2 right-2' onClickMethod={() => setState(false)} />

      <input
        className="block w-1/2 m-auto focus:ring-2 ring-accent-300"
        type="color"
        value={color}
        onChange={handleChange}
      />

      <ValidButton isSubmit content="Valider" />
    </form>
  );
}
