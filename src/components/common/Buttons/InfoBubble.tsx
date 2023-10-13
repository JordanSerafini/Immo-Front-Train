// === REACT === //
import { useState } from 'react';

// === ASSETS === //
import { infoIcon } from '../../../assets';

// === TYPESCRIPT === //
interface InfoBubbleProps {
  content: string;
  containerClassname?: string;
}

function InfoBubble({ content, containerClassname }: InfoBubbleProps) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className={`relative ${containerClassname}`}>
      <img
        src={infoIcon}
        alt="Info Icon"
        className="w-[30px] p-[2px] aspect-square rounded-full bg-secondary-50 shadow-custom cursor-pointer"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      />

      <aside
        className={`absolute w-[250px] bg-secondary-50 duration-300 bottom-6 z-50 left-8 rounded-md shadow-custom p-4 ${
          active ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity`}
      >
        <p>{content}</p>
      </aside>
    </div>
  );
}

InfoBubble.defaultProps = {
  containerClassname: "",
};

export default InfoBubble;
