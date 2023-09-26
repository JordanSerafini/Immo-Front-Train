// Components
import NavBar from '../../NavBar/NavBar';
import Logo from '../Logo/Logo';

function MainSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <NavBar />
      <main className={`m-5 md:m-10 grow ${className}`}>
        <Logo className="sm:hidden" />
        {children}
      </main>
    </>
  );
}

MainSection.defaultProps = {
  className: '',
};

export default MainSection;
