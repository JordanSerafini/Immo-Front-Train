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
      <main className={`my-5 mx-1 sm:mx-5 h-fit md:mb-auto relative grow z-0 ${className}`}>
        <Logo path='/app/prospection' className="sm:hidden" />
        {children}
      </main>
  );
}

MainSection.defaultProps = {
  className: '',
};

export default MainSection;
