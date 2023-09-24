import { ChangeEvent, useId } from 'react';

interface InputProps {
  label?: string;
  value: string;
  type?: string;
  placeholder: string;
  className?: string;
  onChange: (value: string) => void;
}

function Input({
  label,
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
    <div className='flex flex-col'>
      <label
        htmlFor={inputId}
        className={label ? "font-semibold" : "hidden"}
      >
        {label}
      </label>

      <input
        className={className}
        // React - state
        value={value}
        onChange={handleChange}
        id={inputId}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

// Default values for props
Input.defaultProps = {
  type: 'text',
  className: "",
  label: "",
};

// == Export
export default Input;