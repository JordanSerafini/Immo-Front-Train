interface ActionSectionProps {
  icon: string;
  title: string;
}

export default function ActionSection({
  icon,
  title,
}: ActionSectionProps) {
  return (
    <section className="w-[48%] p-4 rounded-lg shadow-custom bg-secondary-50">
      <div className="flex gap-2">
        <img src={icon} alt={icon} />
        <h1 className="text-lg font-semibold font-poppins">{title}</h1>
      </div>

      <div>
        Card Component to insert
      </div>
    </section>
  );
}
