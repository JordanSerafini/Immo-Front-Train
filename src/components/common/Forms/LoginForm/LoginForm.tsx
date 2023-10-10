// === REACT === //
import { FormEvent, useState } from 'react';

// === REACT ROUTER DOM === //
import { Link } from 'react-router-dom';

// === REDUX HOOKS === //
import { useAppDispatch } from '../../../../hooks/redux';

// === REDUCERS === //
import { login } from '../../../../store/reducers/collaborator';

// === COMPONENTS === //
import Input from '../../../Modals/AddInfoModal/Field/Input';
import ValidButton from '../../Buttons/ValidButton';

// === ASSETS === //
import { eyeOffIcon, eyeEmptyIcon, emailIcon } from '../../../../assets';

export default function LoginForm() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === LOCAL STATES === //
  // State to allow a toggle to show or not the password
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // === CONTROLLED INPUT STATES === //
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // === HANDLERS === //
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Reset Email Input State
    setEmail("");
    // Reset Password Input State
    setPassword("");

    // Dispatch Login thunk middleware
    dispatch(login(formData));
  };
  return (
    <form
      className="max-w-[400px] w-full mx-auto mt-20 text-center flex flex-col gap-10 relative"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Email de connexion"
        value={email}
        onChange={setEmail}
        className="w-full pl-8 shadow-custom"
        inputName="email"
        type="email"
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
        className="w-full shadow-custom"
        type={showPassword ? undefined : 'password'}
        inputName="password"
      >
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          <img
            className="w-[24px] absolute top-1/2 -translate-y-1/2 right-5 z-20"
            src={showPassword ? eyeEmptyIcon : eyeOffIcon}
            alt="Password Icon"
          />
        </button>
      </Input>

      <Link to="/reset" className="ml-1 underline -mt-7 text-start">
        Mot de passe oublié ?
      </Link>

      <ValidButton content="Se connecter" isSubmit className="w-full" />
    </form>
  );
}
