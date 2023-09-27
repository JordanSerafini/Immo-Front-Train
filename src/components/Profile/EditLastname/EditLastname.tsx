// React Hooks
import { FormEvent, useState } from 'react';

// Shared Components
import PersonnalInfo from '../PersonnalInfo/PersonnalInfo';
import Input from '../../Modals/AddInfoModal/Field/Input';

// Assets
import checkIcon from '../../../assets/icons/check-circle.svg';

export default function EditLastname({
  lastname,
}: {
  lastname: string | undefined;
}) {
  // Local states
  const [editLastname, setEditLastname] = useState<boolean>(false);
  const [lastnameValue, setLastnameValue] = useState<string | undefined>(
    lastname
  );

  // Handlers Methods
  const handleEditLastname = () => {
    setEditLastname(!editLastname);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <PersonnalInfo clickHandler={handleEditLastname} label='Nom'>
      {editLastname ? (
        <form onSubmit={handleSubmit}>
          <Input
            inputName="lastname"
            className="relative"
            value={lastnameValue}
            onChange={setLastnameValue}
            placeholder="Entrez votre nom"
          >
            <button
              type="submit"
              className="absolute z-10 flex gap-2 p-[0.35rem] font-semibold rounded-md top-1/2 right-2 translate-y-[-50%] text-secondary-50 bg-primary-300 hover:shadow-primary duration-300"
            >
              Ok <img src={checkIcon} alt="check" />
            </button>
          </Input>
        </form>
      ) : (
        <p className="md:text-lg">{lastname}</p>
      )}
    </PersonnalInfo>
  );
}
