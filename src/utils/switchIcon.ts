// === ASSETS === //
import { houseIcon, apartmentIcon, landIcon } from '../assets';

export default function switchIcon(type: string) {
  let icon: string;
  switch (type.toLowerCase()) {
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

  return icon;
}
