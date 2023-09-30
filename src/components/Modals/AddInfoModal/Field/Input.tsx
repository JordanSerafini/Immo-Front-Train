// React
import { ChangeEvent, useId } from 'react';

// Typescript interface
interface InputProps {
  children?: React.ReactNode;
  type?: string;
  className?: string;
  label?: string;
  inputName: string;
  placeholder: string;
  value: string | undefined;
  onChange: (value: string) => void;
}

function Input({
  children,
  type,
  className,
  label,
  inputName,
  placeholder,
  value,
  onChange
}: InputProps) {
  const inputId = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <div className="relative flex flex-col">
      <label htmlFor={inputId} className={`absolute font-poppins font-medium z-0 duration-300 ${value?.length ? "-translate-y-full" : "translate-y-[10%]"}`}>{label || placeholder}</label>

      {children}

      <input
        className={`${className} z-10`}
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
  label: null,
};

// == Export
export default Input;
