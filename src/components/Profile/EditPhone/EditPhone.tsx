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

export default function EditPhone({
  phoneNumber,
}: {
  phoneNumber: string | undefined;
}) {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux state
  const user = useAppSelector((state) => state.user.data);

  // Local states
  const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false);
  const [phoneNumberValue, setPhoneNumberValue] = useState<string | undefined>(
    phoneNumber
  );

  // Handlers Methods
  const handleEditLastname = () => {
    setEditPhoneNumber(!editPhoneNumber);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    const formValues = { ...user, ...formData };

    dispatch(editUser(formValues));
    setEditPhoneNumber(false);
  };

  return (
    <PersonnalInfo clickHandler={handleEditLastname} label="Téléphone">
      {editPhoneNumber ? (
        <form className="mt-5 max-w-[300px]" onSubmit={handleSubmit}>
          <Input
            inputName="phone"
            className="relative"
            value={phoneNumberValue}
            onChange={setPhoneNumberValue}
            placeholder="Entrez votre n° de téléphone"
            // Don't know if I keep the text type for phone number...
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
        <p className="md:text-lg">{phoneNumber}</p>
      )}
    </PersonnalInfo>
  );
}
