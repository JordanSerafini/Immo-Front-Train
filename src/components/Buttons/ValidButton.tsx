// Typescript interface
interface ValidButtonProps {
  content: string;
}

export default function ValidButton({ content }: ValidButtonProps) {
  return (
    <button
      type="button"
      className="px-6 py-2 duration-300 rounded-lg text-secondary-50 bg-primary-300 font-poppins lg:text-lg hover:shadow-primary"
    >
      {content}
    </button>
  );
}
