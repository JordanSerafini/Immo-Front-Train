// Assets
import portrait from '../../../assets/images/portrait_01.png';

// Typescript interface
import { User } from '../../../@types/user';

export default function CollabCard({ firstname, lastname, phone, email, acces }: User) {
  return (
    <article className="flex flex-col items-center justify-center gap-4 p-5 my-5 rounded-lg xl:flex-row xl:justify-around shadow-custom bg-secondary-50">
      <div className="flex justify-around w-full md:w-[350px] xl:w-fit xl:gap-5">
        <img
          src={portrait}
          alt="Portrait"
          className="rounded-full w-28 aspect-square shadow-custom"
        />

        <div className="flex flex-col items-center justify-around xl:justify-center xl:gap-4">
          <h3 className="text-center">Nom</h3>
          <p className="text-center">{firstname} {lastname?.toUpperCase()}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-center">Numéro de téléphone</h3>
        <p>{phone}</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-center">Adresse email</h3>
        <p>{email}</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-center">Date de création de compte</h3>
        <p>En attente</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-center">Accès</h3>
        <p>{acces ? "Oui" : "Non"}</p>
      </div>
    </article>
  );
}
