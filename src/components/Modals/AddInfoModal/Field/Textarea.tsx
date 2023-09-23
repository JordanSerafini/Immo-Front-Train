import { ChangeEvent, useId } from 'react';

interface TextareaProps {
  label?: string;
  value: string;
  placeholder: string;
  className?: string;
  onChange: (value: string) => void;
}

function Textarea({
  label,
  value,
  placeholder,
  className,
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
