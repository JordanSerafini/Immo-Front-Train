// === ASSETS === //
import { checkCircleIcon } from '../../../../assets';

export default function EditSubmitBtn() {
  return (
    <button
      type="submit"
      className="absolute z-30 flex gap-2 p-[0.35rem] font-semibold rounded-md top-1/2 right-1 translate-y-[-50%] text-secondary-50 bg-primary-300 hover:shadow-primary duration-300"
    >
      Ok <img src={checkCircleIcon} alt="Check Icon" />
    </button>
  );
}
