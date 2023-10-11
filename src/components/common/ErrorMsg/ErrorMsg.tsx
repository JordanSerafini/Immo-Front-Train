// === STYLES === //
import './styles/animation.scss';

// === TYPESCRIPT === //
interface ErrorMsgProps {
  errorMessage: string;
  className?: string | null;
}

function ErrorMsg({ errorMessage, className }: ErrorMsgProps) {
  return (
    <p className={`text-red-500 font-semibold animate-shake ${className}`}>
      {errorMessage}
    </p>
  );
}

ErrorMsg.defaultProps = {
  className: '',
};

export default ErrorMsg;
