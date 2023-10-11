// === ASSETS === //
import loader from '../../../assets/loader/tail-spin.svg';

function Loader({ className }: { className?: React.ReactNode }) {
  return <img src={loader} alt="Chargement" className={`${className}`} />;
}

Loader.defaultProps = {
  className: '',
};

export default Loader;
