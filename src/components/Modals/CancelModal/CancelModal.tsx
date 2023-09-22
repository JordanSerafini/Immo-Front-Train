// Components
import Modal from '../Modal';
import ValidButton from '../../Buttons/ValidButton';
import CancelButton from '../../Buttons/CancelButton';

export default function CancelModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  return (
    <Modal closeModal={closeModal}>
      <div className='p-2 flex flex-col gap-6 min-w-[200px] max-w-[300px]'>
        <h1 className='text-lg font-semibold text-center '>
          Vous êtes sur le point de supprimer définitivement une information de
          prospection, confirmez-vous la supression ?
        </h1>
        <div className='flex flex-wrap justify-center gap-3'>
          <ValidButton content="Enregistrer" />
          <CancelButton content="Annuler" onClickMethod={closeModal} />
        </div>
      </div>
    </Modal>
  );
}
