// React Hooks
import { FormEvent, useState } from 'react';

// Shared Components
import PersonnalInfo from '../PersonnalInfo/PersonnalInfo';
import Input from '../../Modals/AddInfoModal/Field/Input';

// Assets
import checkIcon from '../../../assets/icons/check-circle.svg';

export default function EditFirstname({
  firstname,
}: {
  firstname: string | undefined;
}) {
  // Local states
  const [editFirstname, setEditFirstname] = useState<boolean>(false);
  const [firstnameValue, setFirstnameValue] = useState<string | undefined>(
    firstname
  );

  // Handlers Methods
  const handleEditLastname = () => {
    setEditFirstname(!editFirstname);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <PersonnalInfo clickHandler={handleEditLastname} label='Prénom'>
      {editFirstname ? (
        <form onSubmit={handleSubmit}>
          <Input
            inputName="firstname"
            className="relative"
            value={firstnameValue}
            onChange={setFirstnameValue}
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
        <p className="md:text-lg">{firstname}</p>
      )}
    </PersonnalInfo>
  );
}
