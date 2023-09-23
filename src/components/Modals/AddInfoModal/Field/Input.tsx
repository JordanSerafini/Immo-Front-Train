import { ChangeEvent, useId } from 'react';

interface InputProps {
  value: string;
  type?: string;
  placeholder: string;
  className?: string;
  onChange: (value: string) => void;
}

function Input({
  value,
  type,
  placeholder,
  className,
  onChange,
}: InputProps) {
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
Input.defaultProps = {
  type: 'text',
  className: "",
};

// == Export
export default Input;