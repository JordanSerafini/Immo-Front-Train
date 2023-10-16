// === REACT DOM === //
import { createPortal } from 'react-dom';

// === REDUX HOOKS === //
import { useAppSelector, useAppDispatch } from '../../hooks/redux';

// === REDUCERS === //
import {
  hideUpdateAvatarModal,
  showUpdateAvatarModal,
} from '../../store/reducers/modal';

// === COMPONENTS === //
import EditFirstname from '../../components/features/Profile/EditFirstname';
import EditLastname from '../../components/features/Profile/EditLastname';
import EditPhone from '../../components/features/Profile/EditPhone';
import EditEmail from '../../components/features/Profile/EditEmail';
import UpdateAvatarModal from '../../components/Modals/UpdateAvatarModal/UpdateAvatarModal';

// === ASSETS === //
import { editPencilIcon } from '../../assets';

export default function Profile() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REDUX STATES === //
  const user = useAppSelector((state) => state.collaborator.user);
  const updateAvatarModal = useAppSelector(
    (state) => state.modal.isUpdateAvatarModalOpen
  );

  return (
    <>
      <h1 className="mt-10 text-3xl font-semibold text-center font-poppins md:mt-10">
        Mon profil
      </h1>

      <section className="relative max-w-[600px] p-4 pt-20 m-auto mt-32 rounded-lg md:pt-28 shadow-custom bg-secondary-50">
        {/* BOX SHADOW */}
        <div className="absolute top-[-6rem] left-1/2 w-40 md:w-48 rounded-full aspect-square shadow-accent translate-x-[-50%] -z-10 " />
        <img
          className="absolute top-[-6rem] w-40 aspect-square bg-white md:w-48 rounded-full left-1/2 translate-x-[-50%] object-cover"
          src={user.url}
          alt="Profile portrait"
        />
        <button
          type="button"
          onClick={() => dispatch(showUpdateAvatarModal())}
          className="absolute translate-x-[240%] top-[25%] md:translate-x-[300%] md:top-[35%] left-1/2 hover:scale-105 duration-300 focus:ring-2 ring-black rounded-md"
        >
          <img src={editPencilIcon} alt="Pencil" />
        </button>

        <p className="text-xl text-center">
          {user.firstname}{' '}
          <span className="font-semibold">
            {user.lastname?.toUpperCase()}
          </span>
        </p>
        <p className="mt-2 text-2xl italic font-semibold text-center text-secondary-600">
          {user.role_id === 1 ? 'ADMINISTRATEUR' : 'NÉGOCIATEUR'}
        </p>
      </section>

      <section className="relative max-w-[600px] p-4 m-auto mt-10 rounded-lg shadow-custom bg-secondary-50">
        <h2 className="text-lg">Informations personnelles</h2>

        <div className="grid lg:gap-4 lg:grid-cols-2">
          <EditFirstname firstname={user.firstname} />
          <EditLastname lastname={user.lastname} />
        </div>

        <EditPhone phoneNumber={user.phone} />
        <EditEmail email={user.email} />
      </section>
      {/* DISPLAY UPDATE AVATAR MODAL */}
      {updateAvatarModal &&
        createPortal(
          <UpdateAvatarModal
            closeModal={() => dispatch(hideUpdateAvatarModal())}
            content="Choisissez un nouvel avatar parmi la liste ci-dessous"
          />,
          document.body
        )}
    </>
  );
}
