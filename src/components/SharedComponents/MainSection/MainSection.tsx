// Components
import Logo from '../Logo/Logo';

function MainSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {

  return (
      <main className={`m-5 h-fit md:mb-auto relative grow z-0 ${className}`}>
        <Logo className="sm:hidden" />
        {children}
      </main>
  );
}

MainSection.defaultProps = {
  className: '',
};

export default MainSection;
