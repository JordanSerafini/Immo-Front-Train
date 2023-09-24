// Typescript interface
interface ActionSectionProps {
  icon: string;
  title: string;
  children: JSX.Element;
}

export default function ActionSection({
  icon,
  title,
  children,
}: ActionSectionProps) {
  return (
    <section className="p-4 rounded-lg shadow-custom bg-secondary-50 max-h-[250px] overflow-y-scroll">
      <div className="flex gap-2 mb-4">
        <img src={icon} alt={icon} />
        <h1 className="text-lg font-semibold font-poppins">{title}</h1>
      </div>

      <ul className="flex flex-col gap-2">{children}</ul>
    </section>
  );
}
