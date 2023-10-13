// === REACT === //
import { useState } from 'react';

// === ASSETS === //
import { infoIcon } from '../../../assets';

// === TYPESCRIPT === //
interface InfoBubbleProps {
  content: string;
  containerClassname?: string;
  position: string;
}

function InfoBubble({
  content,
  containerClassname,
  position,
}: InfoBubbleProps) {
  const [active, setActive] = useState<boolean>(false);

  let tailwindPosition: string;
  switch (position.toLowerCase()) {
    case 'top-left':
      tailwindPosition = 'bottom-6 right-8';
      break;
    case 'bottom-left':
      tailwindPosition = 'top-6 right-8';
      break;
    case 'top-right':
      tailwindPosition = 'bottom-6 left-8';
      break;
    case 'bottom-right':
      tailwindPosition = 'top-6 left-8';
      break;
    default:
      tailwindPosition = '';
  }

  return (
    <div className={`hidden lg:block ${containerClassname}`}>
      <img
        src={infoIcon}
        alt="Info Icon"
        className="w-[30px] p-[2px] aspect-square rounded-full bg-secondary-50 shadow-custom cursor-pointer"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      />

      <aside
        className={`absolute w-[250px] bg-secondary-50 duration-300 z-50 ${tailwindPosition} rounded-md shadow-custom p-4 ${
          active ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity`}
        aria-hidden={active ? 'true' : 'false'}
      >
        <em>{content}</em>
      </aside>
    </div>
  );
}

InfoBubble.defaultProps = {
  containerClassname: '',
};

export default InfoBubble;
