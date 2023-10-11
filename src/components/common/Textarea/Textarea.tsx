// === REACT === //
import { ChangeEvent, useId } from 'react';

interface TextareaProps {
  label?: string;
  placeholder: string;
  className?: string;
  textareaName: string;
  regExp?: RegExp;
  isRequired?: boolean;
  value: string;
  onChange: (value: string) => void;
}

function Textarea({
  label,
  placeholder,
  className,
  textareaName,
  regExp,
  isRequired = false,
  value,
  onChange,
}: TextareaProps) {
  const inputId = useId();
  const condition = regExp?.test(value as string);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    onChange(event.target.value);
  }

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="font-semibold text-md">
          {label}
        </label>
      )}

      <textarea
        className={`w-full mt-2 min-h-[100px] ${
          condition && 'border-primary-300 focus:ring-transparent'
        } ${className}`}
        // React - state
        value={value}
        onChange={handleChange}
        id={inputId}
        placeholder={placeholder}
        name={textareaName}
        required={isRequired}
      />
    </div>
  );
}

// Default values for props
Textarea.defaultProps = {
  label: '',
  className: '',
  regExp: null,
  isRequired: false,
};

// == Export
export default Textarea;
