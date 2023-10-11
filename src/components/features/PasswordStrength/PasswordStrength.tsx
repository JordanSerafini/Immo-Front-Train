// === REDUX HOOKS === //
import { useAppSelector } from '../../../hooks/redux';

// === COMPONENTS === //
import PasswordStrengthInfo from './PasswordStrengthInfo';

export default function PasswordStrength({inputState} : {inputState: string}) {
    const passwordRegExps = useAppSelector(
        (state) => state.regexps.passwordStrength
      );
    
  return (
    <div className="-mt-5 text-secondary-700">
      <p className="italic font-semibold text-secondary-600">
        Le mot de passe doit contenir au mieux 8 caractères, un symbole et un
        chiffre
      </p>
      <p className="font-medium text-center text-md font-poppins">
        Force du mot de passe
      </p>
      <section className="grid grid-cols-3 gap-4">
        {passwordRegExps.weak.test(inputState) && (
          <PasswordStrengthInfo content="Faible" tailwindColor="bg-red-600" />
        )}
        {passwordRegExps.medium.test(inputState) && (
          <PasswordStrengthInfo content="Moyen" tailwindColor="bg-orange-500" />
        )}
        {passwordRegExps.strong.test(inputState) && (
          <PasswordStrengthInfo content="Fort" tailwindColor="bg-green-600" />
        )}
      </section>
    </div>
  );
}
