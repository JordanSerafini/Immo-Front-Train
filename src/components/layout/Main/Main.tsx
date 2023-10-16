// === COMPONENTS === //
import Logo from '../Logo/Logo';

// === TYPESCRIPT === //
interface MainProps {
  children: React.ReactNode;
  className?: string;
  specificPath?: string;
}

function Main({
  children,
  className,
  specificPath = '/app/prospection',
}: MainProps) {
  return (
    <main
      className={`my-5 mx-3 sm:mx-5 h-fit md:mb-auto relative grow z-0 ${className}`}
    >
      <Logo path={specificPath} className="sm:hidden" />
      {children}
    </main>
  );
}

Main.defaultProps = {
  className: '',
  specificPath: '/app/prospection',
};

export default Main;
