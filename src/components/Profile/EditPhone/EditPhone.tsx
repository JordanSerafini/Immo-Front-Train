// React Hooks
import { FormEvent, useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { editUser } from '../../../store/reducers/user';

// Shared Components
import PersonnalInfo from '../PersonnalInfo/PersonnalInfo';
import Input from '../../Modals/AddInfoModal/Field/Input';
import EditForm from '../EditForm/EditForm';
import EditSubmitBtn from '../EditForm/EditSubmitBtn';

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
        <EditForm submitMethod={handleSubmit}>
          <Input
            inputName="phone"
            className="relative"
            value={phoneNumberValue}
            onChange={setPhoneNumberValue}
            placeholder="Entrez votre n° de téléphone"
            type="number"
            regExp={/^\d{10}$/}
          >
            <EditSubmitBtn />
          </Input>
        </EditForm>
      ) : (
        <p className="md:text-lg">{phoneNumber}</p>
      )}
    </PersonnalInfo>
  );
}
