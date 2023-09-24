// Redux
import { useAppDispatch } from '../../../hooks/redux';

// Store
import {
  showCancelConfirmationModal
} from '../../../store/reducers/modal';

// Components
import ValidButton from '../../Buttons/ValidButton';
import CancelButton from '../../Buttons/CancelButton';

// Asset
import houseIcon from '../../../assets/icons/house.svg';
import apartmentIcon from '../../../assets/icons/apartment.svg';
import landIcon from '../../../assets/icons/land.svg';

// Utils
import capFirstLetter from '../../../utils/capFirstLetter';


// Typescript interface
interface ProspectionInformationProps {
  address: string;
  owner: string;
  type: string;
  category: string;
}

export default function ProspectionInformation({address, owner, type, category}: ProspectionInformationProps) {

  const dispatch = useAppDispatch();

  let icon: string;
  switch (type) {
    case 'maison':
      icon = houseIcon;
      break;
    case 'appartement':
      icon = apartmentIcon;
      break;
    case 'terrain':
      icon = landIcon;
      break;
    default:
      icon = '';
  }

  return (
    <article className="p-4 mb-5 rounded-lg lg:my-2 shadow-custom bg-secondary-50">
      <div className="flex flex-col gap-2">
        <img src={icon} alt={`${icon} Icon`} className="w-[25px] md:w-[30px]" />
        <p className="font-bold md:text-md xl:text-lg">{address}</p>
        <p className="font-bold md:text-md xl:text-lg">{owner}</p>
        <strong className="text-lg font-bold md:text-xl text-accent-400">
          {capFirstLetter(category)}
        </strong>
      </div>

      <div className="flex justify-between mt-5">
        <ValidButton content="Voir plus" />
        <CancelButton content="Supprimer" onClickMethod={() => dispatch(showCancelConfirmationModal())}/>
      </div>
    </article>
  );
}
