// React Hooks
import { FormEvent, useState } from 'react';

// Redux
import { useAppDispatch } from '../../../hooks/redux';

// Store
import { login } from '../../../store/reducers/user';

// Components
import Input from '../../Modals/AddInfoModal/Field/Input';
import ValidButton from '../../SharedComponents/Buttons/ValidButton';

// Assets
import eyeIcon from '../../../assets/icons/eye-empty.svg';
import eyeOffIcon from '../../../assets/icons/eye-off.svg';
import emailIcon from '../../../assets/icons/email.svg';

export default function LoginForm() {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // The useState React Hook is used to set a state variable and its setter
  // Here, we have two useState variables, "showPassword" to display or not the password and "password" to control the input password
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    dispatch(login(formData));
  };
  return (
    <form
      className="max-w-[400px] w-full mx-auto mt-20 text-center flex flex-col gap-5"
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
          className="w-[24px] absolute top-1/2 -translate-y-1/2 right-5"
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
        <button type="button" onClick={togglePasswordVisibility}>
          <img
            className="w-[24px] absolute top-1/2 -translate-y-1/2 right-5"
            src={showPassword ? eyeIcon : eyeOffIcon}
            alt="Password Icon"
          />
        </button>
      </Input>

      <ValidButton content="Se connecter" isSubmit className="mt-10" />
    </form>
  );
}