import { ChangeEvent, useId } from 'react';

interface FieldProps {
  value: string;
  type?: string;
  placeholder: string;
  className?: string;
  onChange: (value: string) => void;
}

function Field({
  value,
  type,
  placeholder,
  className,
  onChange,
}: FieldProps) {
  const inputId = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <div>
      <input
        className={className}
        // React - state
        value={value}
        onChange={handleChange}
        id={inputId}
        type={type}
        placeholder={placeholder}
      />

      <label
        htmlFor={inputId}
        className="hidden"
      >
        {placeholder}
      </label>
    </div>
  );
}

// Default values for props
Field.defaultProps = {
  type: 'text',
  className: "",
};

// == Export
export default Field;