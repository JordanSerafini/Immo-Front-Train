// Typescript interface
interface CancelButtonProps {
  content: string;
}

export default function CancelButton({ content }: CancelButtonProps) {
  return (
    <button
      type="button"
      className="p-[3px] duration-300 rounded-md bg-gradient-to-tr from-[#1A44FF] to-[#944DFF] hover:shadow-accent"
    >
      <div className="flex items-center justify-center w-full h-full px-4 font-semibold rounded lg:text-lg bg-secondary-50">
        {content}
      </div>
    </button>
  );
}
