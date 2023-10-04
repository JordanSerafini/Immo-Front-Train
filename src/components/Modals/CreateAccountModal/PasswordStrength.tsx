// Typescript interface
interface PasswordStrengthProps {
    content: string;
    tailwindColor: string;
}

export default function PasswordStrength({content, tailwindColor}: PasswordStrengthProps) {
  return (
    <div>
      <p className="text-center">{content}</p>
      <div className={`h-[5px] ${tailwindColor}`} />
    </div>
  );
}
