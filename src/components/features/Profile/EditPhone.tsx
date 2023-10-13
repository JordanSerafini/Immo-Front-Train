// === REACT === //
import { FormEvent, useState } from 'react';

// === LIBRARY === //
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// === REDUCERS === //
import { editCollaborator } from '../../../store/reducers/collaborator';

// === COMPONENTS === //
// Common
import Input from '../../common/Inputs/Input';
// Local
import PersonnalInfo from './PersonnalInfo';
import EditForm from './EditForm/EditForm';
import EditSubmitBtn from './EditForm/EditSubmitBtn';

// === UTILS === //
import formatPhone from '../../../utils/formatPhone';

export default function EditPhone({
  phoneNumber,
}: {
  phoneNumber: string | undefined;
}) {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REDUX STATES === //
  const user = useAppSelector((state) => state.collaborator.user);
  const regExps = useAppSelector((state) => state.regexps.user.phone);

  // === LOCAL STATES === //
  const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false);
  const [phoneNumberValue, setPhoneNumberValue] = useState<string | undefined>(
    phoneNumber
  );

  // === HANDLERS === //
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    const formValues = { ...user, ...formData };

    if (regExps.test(phoneNumberValue as string)) {
      dispatch(editCollaborator(formValues));
      setEditPhoneNumber(false);
    } else {
      toast.error('Votre numéro de téléphone doit contenir 10 chiffres.', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <PersonnalInfo
      clickHandler={() => setEditPhoneNumber(!editPhoneNumber)}
      label="Téléphone"
    >
      {editPhoneNumber ? (
        <EditForm submitMethod={handleSubmit}>
          <Input
            inputName="phone"
            className="relative"
            value={phoneNumberValue}
            onChange={setPhoneNumberValue}
            placeholder="Entrez votre n° de téléphone"
            type="number"
            regExp={regExps}
          >
            <EditSubmitBtn />
          </Input>
        </EditForm>
      ) : (
        <p className="md:text-lg">{phoneNumber && formatPhone(phoneNumber)}</p>
      )}
    </PersonnalInfo>
  );
}
