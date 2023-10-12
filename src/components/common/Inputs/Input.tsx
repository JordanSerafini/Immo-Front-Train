// === REACT === //
import { ChangeEvent, Ref, useId } from 'react';

// === REDUX HOOKS === //
import { useAppDispatch } from '../../../hooks/redux';

// === REDUCERS === //
import { filterInformations } from '../../../store/reducers/information';

// Typescript interface
interface InputProps {
  children?: React.ReactNode;
  type?: string;
  className?: string;
  containerClassName?: string;
  label?: string;
  regExp?: RegExp;
  isRequired?: boolean;
  inputRef?: Ref<HTMLInputElement> | null;
  placeholder: string;
  inputName: string;
  value: string | undefined;
  onChange: (value: string) => void;
}

function Input({
  children,
  type,
  className,
  containerClassName,
  label,
  inputName,
  inputRef,
  placeholder,
  regExp,
  isRequired = false,
  value,
  onChange,
}: InputProps) {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();
  const inputId = useId();
  const condition = regExp?.test(value as string);

  // === HANDLERS === //
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);

    if (type === 'search') {
      dispatch(filterInformations(event.target.value));
    }
  }

  return (
    <div className={`relative flex flex-col ${containerClassName}`}>
      <label
        htmlFor={inputId}
        className={`absolute font-poppins font-medium z-0 duration-300 ${
          value?.length
            ? 'opacity-100 -translate-y-full'
            : 'opacity-0 translate-y-[10%]'
        }`}
        aria-hidden={value?.length ? 'false' : 'true'}
      >
        {label || placeholder}
      </label>

      <input
        className={`${className} ${
          (condition ||
            (type === 'number' &&
              condition &&
              !Number.isNaN(parseInt(value as string, 10)))) &&
          'border-primary-300 focus:ring-transparent'
        } z-10`}
        // React - state
        value={value}
        onChange={handleChange}
        id={inputId}
        type={type}
        placeholder={placeholder}
        name={inputName}
        required={isRequired}
        autoComplete="off"
        ref={inputRef}
        // ACCESSIBILITY //
        aria-required={isRequired ? 'true' : 'false'}
        aria-label={label || placeholder}
        role={type === "search" ? "search" : undefined}
      />
      
      {children}
    </div>
  );
}

// Default values for props
Input.defaultProps = {
  children: null,
  type: 'text',
  className: '',
  containerClassName: '',
  label: null,
  regExp: null,
  isRequired: false,
  inputRef: null,
};

// == Export
export default Input;
