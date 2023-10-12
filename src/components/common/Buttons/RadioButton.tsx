/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// === REACT === //
import { ChangeEvent, useId } from 'react';

// === UTILS === //
import capFirstLetter from '../../../utils/capFirstLetter';

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

  const handleEnter = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.code === 'Enter' || event.code === "NumpadEnter") {
      onChange(value)
    }
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
        aria-hidden="true"
      />

      <label
        htmlFor={inputId}
        className={`rounded-md p-2 ${(blackIcon || whiteIcon) && 'pl-8'} border-solid border-2 font-poppins text-md sm:text-lg border-accent-400 duration-150 outline-primary-200 ${
          state === value ? 'bg-accent-400 text-secondary-50' : ''
        }`}
        tabIndex={0}
        onKeyDown={handleEnter}
        aria-checked={state === value ? "true" : "false"}
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