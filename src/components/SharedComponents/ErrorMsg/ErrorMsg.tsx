// Animation Style
import './animation.scss';

// Typescript interface
interface ErrorMsgProps {
    errorMessage: string;
    className?: string | null;
}

function ErrorMsg({ errorMessage, className }: ErrorMsgProps) {
  return (
    <p className={`text-red-500 font-semibold animate-shake ${className}`}>{errorMessage}</p>
  )
}

ErrorMsg.defaultProps = {
    className: null,
}

export default ErrorMsg;