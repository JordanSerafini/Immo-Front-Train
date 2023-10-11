// === TYPESCRIPT === //
interface PasswordStrengthProps {
    content: string;
    tailwindColor: string;
}

export default function PasswordStrengthInfo({content, tailwindColor}: PasswordStrengthProps) {
  return (
    <div>
      <p className="text-center">{content}</p>
      <div className={`h-[5px] ${tailwindColor}`} />
    </div>
  );
}
