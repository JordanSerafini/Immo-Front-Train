// === REACT === //
import { FormEvent, useState } from 'react';

// === LIBRARY === //
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { editCollaborator } from '../../../store/reducers/collaborator';

// === COMPONENTS === //
// Common
import Input from '../../common/Inputs/Input';
import InfoBubble from '../../common/Buttons/InfoBubble';
// Local
import PersonnalInfo from './PersonnalInfo';
import EditForm from './EditForm/EditForm';

// === ASSETS === //
import { checkCircleIcon } from '../../../assets';

// === UTILS === //
import trimFormValues from '../../../utils/trimFormValues';

export default function EditEmail({ email }: { email: string | undefined }) {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REDUX STATES === //
  const user = useAppSelector((state) => state.collaborator.user);
  const regExps = useAppSelector((state) => state.regexps.user.email);

  // === LOCAL STATES === //
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string | undefined>(email);

  // === HANDLERS === //
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;
    const trimmedFormData = trimFormValues(form);

    const formValues = { ...user, ...trimmedFormData };

    if (regExps.test(emailValue as string)) {
      dispatch(editCollaborator(formValues));
      setEditEmail(false);
      setEmailValue(emailValue?.trim());
    } else {
      toast.error("Votre email n'est pas valide.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <PersonnalInfo clickHandler={() => setEditEmail(!editEmail)} label="Email">
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
              Ok <img src={checkCircleIcon} alt="Check Icon" />
            </button>
          </Input>
        </EditForm>
      ) : (
        <div className='flex gap-2'>
          <p className="md:text-lg w-fit">{email}</p>
          <InfoBubble position='top-right' content='La modification de votre email entrainera la modification de votre identifiant de connexion.' containerClassname='relative -top-4' />
        </div>
      )}
    </PersonnalInfo>
  );
}
