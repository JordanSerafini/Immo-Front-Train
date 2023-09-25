// Typescript interface
interface PersonnalInfoProps {
  label: string;
  content: string | null;
}

export default function PersonnalInfo({ label, content }: PersonnalInfoProps) {
  return (
    <div>
      <p className="font-semibold text-secondary-600">{label}</p>
      <p className="md:text-lg">{content}</p>
    </div>
  );
}
