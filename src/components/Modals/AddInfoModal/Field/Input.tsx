import { ChangeEvent, useId } from 'react';

interface InputProps {
  children?: JSX.Element;
  label?: string;
  type?: string;
  value: string;
  placeholder: string;
  className?: string;
  onChange: (value: string) => void;
}

function Input({
  children,
  label,
  type,
  value,
  placeholder,
  className,
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
};

// == Export
export default Input;
