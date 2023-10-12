// === STYLES === //
import './styles/animation.scss';

// === TYPESCRIPT === //
interface ErrorMsgProps {
  content: string;
  className?: string | null;
}

function ErrorMsg({ content, className }: ErrorMsgProps) {
  return (
    <p role='alert' className={`text-red-500 font-semibold ${className}`}>
      {content}
    </p>
  );
}

ErrorMsg.defaultProps = {
  className: '',
};

export default ErrorMsg;
