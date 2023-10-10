// === TYPESCRIPT === //
interface ValidButtonProps {
  content: string;
  onClickMethod?: () => void;
  isSubmit?: boolean;
  className?: string;
}

function ValidButton({
  content,
  onClickMethod,
  isSubmit,
  className
}: ValidButtonProps) {
  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      className={`px-6 py-2 duration-300 rounded-lg text-secondary-50 bg-primary-300 font-poppins lg:text-lg hover:shadow-primary ${className}`}
      onClick={onClickMethod}
    >
      {content}
    </button>
  );
}

ValidButton.defaultProps = {
  onClickMethod: () => {},
  isSubmit: false,
  className: ''
};

export default ValidButton;
