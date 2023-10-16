// === REACT === //
import { FormEvent, useEffect, useRef, useState } from 'react';

// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// === REACT ROUTER DOM === //
import { Link, useNavigate } from 'react-router-dom';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

// === REDUCERS === //
import { login } from '../../../../store/reducers/collaborator';

// === COMPONENTS === //
import Input from '../../Inputs/Input';
import ValidButton from '../../Buttons/ValidButton';

// === ASSETS === //
import { eyeOffIcon, eyeEmptyIcon, emailIcon } from '../../../../assets';

export default function LoginForm() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // === REFERENCES === //
  const focusRef = useRef<HTMLInputElement>(null);

  // === REDUX STATES === //
  const mailRegexp = useAppSelector(
    (state) => state.regexps.information.owner_email
  );
  const user = useAppSelector((state) => state.collaborator.user);

  // === LOCAL STATES === //
  // State to allow a toggle to show or not the password
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // === CONTROLLED INPUT STATES === //
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // === EFFECTS === //
  useEffect(() => {
    // We want to force the focus on the addressNumber input once the user opens the modal
    focusRef.current?.focus();
  }, []);

  // === HANDLERS === //
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!mailRegexp.test(email)) {
      toast.error("Votre mail n'est pas valide", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      // Reset Email Input State
      setEmail('');
      // Reset Password Input State
      setPassword('');

      // Dispatch Login thunk middleware
      dispatch(login(formData));

    }
  };

  // === EFFECTS === //
  // After the form is sent, we verify is the user has acces in the redux state
  useEffect(() => {
    if (user.acces) {
      if (user.role_id !== 1) {
        navigate("/app/prospection")
      } else {
        navigate("/admin/dashboard")
      }
    }
  }, [dispatch, navigate, user.acces, user.role_id])

  return (
    <form
      className="max-w-[400px] w-full mx-auto mt-8 text-center flex flex-col gap-10 relative"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Email de connexion"
        value={email}
        onChange={setEmail}
        className="w-full pl-8 shadow-custom"
        inputName="email"
        type="email"
        inputRef={focusRef}
        regExp={mailRegexp}
        isRequired
      >
        <img
          className="w-[24px] absolute top-1/2 -translate-y-1/2 right-5 z-20"
          src={emailIcon}
          alt="Email Icon"
        />
      </Input>

      <Input
        placeholder="Mot de passe"
        value={password}
        onChange={setPassword}
        className="relative w-full shadow-custom"
        type={showPassword ? undefined : 'password'}
        inputName="password"
        isRequired
      >
        <button
          type="button"
          className="w-[24px] absolute top-1/2 -translate-y-1/2 right-5 z-20"
          onClick={() => setShowPassword(!showPassword)}
        >
          <img
            className="w-[24px]"
            src={showPassword ? eyeEmptyIcon : eyeOffIcon}
            alt="Password Icon"
          />
        </button>
      </Input>

      <Link to="/reset" className="ml-1 underline -mt-7 text-start w-fit">
        Mot de passe oublié ?
      </Link>

      <ValidButton content="Se connecter" isSubmit className="w-full" />
    </form>
  );
}
