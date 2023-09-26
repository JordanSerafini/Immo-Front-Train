import { ChangeEvent, useId } from 'react';

interface InputProps {
  children?: React.ReactNode;
  label?: string;
  type?: string;
  className?: string;
  inputName?: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

function Input({
  children,
  label,
  type,
  value,
  placeholder,
  className,
  inputName,
  onChange,
}: InputProps) {
  const inputId = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <div className="relative flex flex-col">
      <label htmlFor={inputId} className={label ? 'font-semibold' : 'hidden'}>
        {label}
      </label>

      {children}

      <input
        className={className}
        // React - state
        value={value}
        onChange={handleChange}
        id={inputId}
        type={type}
        placeholder={placeholder}
        name={inputName}
      />
    </div>
  );
}

// Default values for props
Input.defaultProps = {
  children: null,
  type: 'text',
  className: '',
  label: '',
  inputName: '',
};

// == Export
export default Input;
