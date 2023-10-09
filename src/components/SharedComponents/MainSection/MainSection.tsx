// Components
import Logo from '../Logo/Logo';

// Typescript
interface MainSectionProps {
  children: React.ReactNode;
  className?: string;
  specificPath?: string;
}

function MainSection({
  children,
  className,
  specificPath = '/app/prospection',
}: MainSectionProps) {
  return (
    <main
      className={`my-5 mx-1 sm:mx-5 h-fit md:mb-auto relative grow z-0 ${className}`}
    >
      <Logo path={specificPath} className="sm:hidden" />
      {children}
    </main>
  );
}

MainSection.defaultProps = {
  className: '',
  specificPath: '/app/prospection',
};

export default MainSection;
