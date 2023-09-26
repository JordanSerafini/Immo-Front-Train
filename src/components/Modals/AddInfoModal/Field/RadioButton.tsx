import { ChangeEvent, useId } from 'react';

// Utils
import capFirstLetter from '../../../../utils/capFirstLetter';

interface RadioButtonProps {
  className?: string;
  whiteIcon?: string;
  blackIcon?: string;
  buttonName: string;
  value: string;
  state: string;
  onChange: (value: string) => void;
}

function RadioButton({
  className,
  whiteIcon,
  blackIcon,
  buttonName,
  value,
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
        name={buttonName}
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