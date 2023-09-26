// Typescript interface
interface CancelButtonProps {
  content: string;
  onClickMethod?: () => void;
}

function CancelButton({ content, onClickMethod }: CancelButtonProps) {
  return (
    <button
      onClick={onClickMethod}
      type="button"
      className="p-[3px] h-[45px] duration-300 lg:text-lg rounded-md bg-gradient-to-tr from-[#1A44FF] to-[#944DFF] hover:shadow-accent"
    >
      <div className="flex items-center justify-center w-full h-full px-4 font-semibold rounded lg:text-lg bg-secondary-50">
        {content}
      </div>
    </button>
  );
}

CancelButton.defaultProps = {
  onClickMethod: () => {},
};

export default CancelButton;
