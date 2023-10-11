// === TYPESCRIPT === //
interface FieldsetProps {
  children: React.ReactNode;
  title: string;
}

export default function Fieldset({ children, title }: FieldsetProps) {
  return (
    <fieldset className="w-full p-4 rounded-md shadow-custom lg:w-[45%]">
      <h2 className="text-lg font-semibold font-poppins">{title}</h2>
      {children}
    </fieldset>
  );
}
