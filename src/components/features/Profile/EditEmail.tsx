// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Hooks
import { FormEvent, useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { editCollaborator } from '../../../store/reducers/collaborator';

// Shared Components
import PersonnalInfo from './PersonnalInfo';
import Input from '../../common/Inputs/Input';
import EditForm from './EditForm/EditForm';

// Assets
import checkIcon from '../../../assets/icons/check-circle.svg';

export default function EditEmail({ email }: { email: string | undefined }) {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux state
  const user = useAppSelector((state) => state.collaborator.user);

  // Local states
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string | undefined>(email);
  const regExps = useAppSelector((state) => state.regexps.user.email);

  // Handlers Methods
  const handleEditLastname = () => {
    setEditEmail(!editEmail);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    const formValues = { ...user, ...formData };


    if (regExps.test(emailValue as string)) {
      dispatch(editCollaborator(formValues));
      setEditEmail(false);
    } else {
      toast.error("Votre email n'est pas valide.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <PersonnalInfo clickHandler={handleEditLastname} label="Email">
      {editEmail ? (
        <EditForm submitMethod={handleSubmit}>
          <Input
            inputName="email"
            className="relative"
            value={emailValue}
            onChange={setEmailValue}
            placeholder="Entrez votre email"
            type="email"
            regExp={regExps}
          >
            <button
              type="submit"
              className="absolute z-30 flex gap-2 p-[0.35rem] font-semibold rounded-md top-0 -right-2 translate-y-[-50%] text-secondary-50 bg-primary-300 hover:shadow-primary duration-300"
            >
              Ok <img src={checkIcon} alt="check" />
            </button>
          </Input>
        </EditForm>
      ) : (
        <p className="md:text-lg">{email}</p>
      )}
    </PersonnalInfo>
  );
}
