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

export default function EditEmail({ email }: { email: string | undefined }) {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux state
  const user = useAppSelector((state) => state.user.data);

  // Local states
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string | undefined>(email);

  // Handlers Methods
  const handleEditLastname = () => {
    setEditEmail(!editEmail);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    const formValues = { ...user, ...formData };

    dispatch(editUser(formValues));
    setEditEmail(false);
  };

  return (
    <PersonnalInfo clickHandler={handleEditLastname} label="Email">
      {editEmail ? (
        <form className="w-[350px]" onSubmit={handleSubmit}>
          <Input
            inputName="lastname"
            className="relative"
            value={emailValue}
            onChange={setEmailValue}
            placeholder="Entrez votre email"
            type="email"
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
        <p className="md:text-lg">{email}</p>
      )}
    </PersonnalInfo>
  );
}
