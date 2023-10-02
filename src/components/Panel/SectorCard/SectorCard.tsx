// Assets
import pencilIcon from "../../../assets/icons/edit-pencil.svg";

export default function SectorCard() {
  return (
    <article className="flex flex-wrap justify-around gap-8 p-5 my-5 rounded-lg bg-secondary-50 shadow-custom">
      <div className="flex flex-col items-center gap-4">
        <h3>Ville</h3>
        <p>ANNECY</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3>Code Postal</h3>
        <p>74000</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="flex gap-2">Attributé à <img src={pencilIcon} alt="Pencil Icon" /></h3>
        <p>Amandine LEROUX</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3>Couleur</h3>
        <p>couleur</p>
      </div>
    </article>
  );
}
