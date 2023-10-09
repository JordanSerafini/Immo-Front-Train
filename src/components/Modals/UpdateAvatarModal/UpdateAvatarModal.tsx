// React
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// Reducer
import { fetchAvatars } from '../../../store/reducers/avatar';

// Components
import Modal from '../Modal';
import ValidButton from '../../SharedComponents/Buttons/ValidButton';
import CancelButton from '../../SharedComponents/Buttons/CancelButton';

// Assets
import loader from '../../../assets/loader/tail-spin.svg';
import { editCollaborator, updateCollaboratorUrl } from '../../../store/reducers/collaborator';

// Typescript interface
interface UpdateAvatarModalProps {
  closeModal: () => void;
  content: string;
}

export default function UpdateAvatarModal({
  closeModal,
  content,
}: UpdateAvatarModalProps) {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Local States
  const [avatarId, setAvatarId] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  // Redux states
  const avatars = useAppSelector((state) => state.avatar.data);
  const isLoading = useAppSelector((state) => state.avatar.loading);
  const user = useAppSelector((state) => state.collaborator.user);

  // Handlers
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues = {...user, avatar_id: parseInt(avatarId, 10)};

    dispatch(updateCollaboratorUrl({url: avatarUrl as string}))
    dispatch(editCollaborator(formValues))
    closeModal();
  };
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setAvatarId(event.target.value);
    setAvatarUrl(event.target.dataset.url as string)
  }

  useEffect(() => {
    dispatch(fetchAvatars());
  }, [dispatch]);

  return (
    <Modal closeModal={closeModal}>
      <div className="flex flex-col max-w-[500px] gap-6 p-2">
        <h1 className="text-2xl">{content}</h1>

        <form onSubmit={handleSubmit}>
          <fieldset className="grid grid-cols-1 gap-4 justify-items-center sm:grid-cols-2 md:grid-cols-3 md:gap-8">
            {isLoading && <img src={loader} alt="Loader" />}

            {avatars.length &&
              avatars.map((avatar) => (
                <div
                  key={avatar.id}
                  className="w-[150px] aspect-square rounded-full relative"
                >
                  <input
                    className={` duration-300 absolute w-full h-full rounded-full opacity-0 cursor-pointer`}
                    type="radio"
                    value={avatar.id}
                    name="avatar_id"
                    onChange={handleChange}
                    data-url={avatar.url}
                  />
                  <img
                    className={`${avatarId === avatar.id.toString() ? "ring-4 ring-accent-300 border-secondary-500" : ""} duration-300 w-[150px] aspect-square rounded-full block m-auto cursor-pointer`}
                    src={avatar.url}
                    alt="avatar"
                  />
                </div>
              ))}
          </fieldset>

          <div className="flex flex-wrap justify-around gap-2 m-5">
            <ValidButton
              content="Confirmer"
              isSubmit
            />

            <CancelButton content="Annuler" onClickMethod={closeModal} />
          </div>
        </form>
      </div>
    </Modal>
  );
}
