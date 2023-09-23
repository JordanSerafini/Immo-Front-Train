// Typescript interface
interface ValidButtonProps {
  content: string;
  onClickMethod?: () => void;
  isSubmit?: boolean;
}

function ValidButton({
  content,
  onClickMethod,
  isSubmit = false,
}: ValidButtonProps) {
  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      className="px-6 py-2 duration-300 rounded-lg text-secondary-50 bg-primary-300 font-poppins lg:text-lg hover:shadow-primary"
      onClick={onClickMethod}
    >
      {content}
    </button>
  );
}

ValidButton.defaultProps = {
  onClickMethod: () => {},
  isSubmit: false,
};

export default ValidButton;
