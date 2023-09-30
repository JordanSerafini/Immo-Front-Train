// React Hooks
import { FormEvent, useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { editUser } from '../../../store/reducers/user';

// Shared Components
import PersonnalInfo from '../PersonnalInfo/PersonnalInfo';
import Input from '../../Modals/AddInfoModal/Field/Input';

// Assets
import checkIcon from '../../../assets/icons/check-circle.svg';

// Typescript interface
interface EditLastnameProps {
  lastname: string | undefined;
}

export default function EditLastname({ lastname }: EditLastnameProps) {
  // Local states
  const [editLastname, setEditLastname] = useState<boolean>(false);
  const [lastnameValue, setLastnameValue] = useState<string | undefined>(
    lastname
  );
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux state
  const user = useAppSelector((state) => state.user.data);

  // Handlers Methods
  const handleEditLastname = () => {
    setEditLastname(!editLastname);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    const formValues = { ...user, ...formData };

    dispatch(editUser(formValues));
    setEditLastname(false);
  };

  return (
    <PersonnalInfo clickHandler={handleEditLastname} label="Nom">
      {editLastname ? (
        <form onSubmit={handleSubmit} className='mt-5 max-w-[300px]'>
          <Input
            inputName="lastname"
            className="relative"
            value={lastnameValue}
            onChange={setLastnameValue}
            placeholder="Entrez votre nom"
          >
            <button
              type="submit"
              className="absolute z-30 flex gap-2 p-[0.35rem] font-semibold rounded-md top-1/2 right-1 translate-y-[-50%] text-secondary-50 bg-primary-300 hover:shadow-primary duration-300"
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
