// Components
import Logo from '../SharedComponents/Logo/Logo';
import SupportFooter from '../Support/SupportFooter/SupportFooter';

// Assets
import valid from '../../assets/icons/valid.svg';

export default function SupportConfirmation() {
  return (
    <>
      {/* LOGO */}
      <Logo path="/" className="absolute top-5 left-5" />

      <main className="flex flex-col items-center w-full h-full">
        {/* TITLE */}
        <div className="flex flex-col items-center justify-center grow">
          <img
            src={valid}
            alt="Valid Icon"
            className="w-[50px] mb-5"
          />
          <h2>Votre demande de contact a été envoyée avec succès.</h2>
          <h2>Nous revenons vers vous très rapidement.</h2>
        </div>
        <SupportFooter />
      </main>
    </>
  );
}