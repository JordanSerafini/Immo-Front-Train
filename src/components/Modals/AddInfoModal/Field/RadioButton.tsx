import { ChangeEvent, useId } from 'react';

// Utils
import capFirstLetter from '../../../../utils/capFirstLetter';

interface RadioButtonProps {
  value: string;
  className?: string;
  state: string;
  whiteIcon?: string;
  blackIcon?: string;
  onChange: (value: string) => void;
}

function RadioButton({
  value,
  className,
  whiteIcon,
  blackIcon,
  state,
  onChange,
}: RadioButtonProps) {
  const inputId = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <div className="relative">
      {(blackIcon || whiteIcon) && (
        <img
          className="absolute top-0 pointer-events-none left-2"
          src={state === value ? whiteIcon : blackIcon}
          alt={`${value} icon`}
        />
      )}
      <input
        className={`hidden ${className}`}
        // React - state
        value={value}
        onChange={handleChange}
        id={inputId}
        checked={state === value}
        type="radio"
      />

      <label
        htmlFor={inputId}
        className={`rounded-md p-2 ${(blackIcon || whiteIcon) && 'pl-8'} border-solid border-2 font-poppins text-lg border-accent-400 duration-150 ${
          state === value ? 'bg-accent-400 text-secondary-50' : ''
        }`}
      >
        {capFirstLetter(value)}
      </label>
    </div>
  );
}

// Default values for props
RadioButton.defaultProps = {
  className: '',
  whiteIcon: '',
  blackIcon: '',
};

// == Export
export default RadioButton;

/**
 * <div className="relative">
        <img
            className="absolute top-0 left-2"
            src={selectedTypeOption === 'maison' ? whiteHouse : house}
            alt="House icon"
        />
        <input
            type="radio"
            id="maison"
            name="type"
            value="maison"
            onChange={handleRadioChange}
            checked={selectedTypeOption === 'maison'}
            className="hidden"
        />
        <label
            htmlFor="maison"
            className={`rounded-md p-2 pl-8 border-solid border-2 border-accent-400 duration-150 ${
            selectedTypeOption === 'maison'
                ? 'bg-accent-400 text-secondary-50'
                : ''
            }`}
        >
            Maison
        </label>
    </div>
 */
