// Typescript interface
interface FieldsetProps {
  children: JSX.Element;
  title: string;
}

export default function Fieldset({ children, title }: FieldsetProps) {
  return (
    <fieldset className="w-full p-4 rounded-md shadow-custom">
      <h2 className="text-lg font-semibold font-poppins">{title}</h2>
      {children}
    </fieldset>
  );
}
