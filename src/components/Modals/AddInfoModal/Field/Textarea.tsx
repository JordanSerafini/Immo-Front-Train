import { ChangeEvent, useId } from 'react';

interface TextareaProps {
  label?: string;
  value: string;
  placeholder: string;
  className?: string;
  textareaName: string;
  onChange: (value: string) => void;
}

function Textarea({
  label,
  value,
  placeholder,
  className,
  textareaName,
  onChange,
}: TextareaProps) {
  const inputId = useId();

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
        className={`w-full mt-2 min-h-[100px] ${className}`}
        // React - state
        value={value}
        onChange={handleChange}
        id={inputId}
        placeholder={placeholder}
        name={textareaName}
      />
    </div>
  );
}

// Default values for props
Textarea.defaultProps = {
  label: '',
  className: '',
};

// == Export
export default Textarea;
