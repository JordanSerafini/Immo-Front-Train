// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// === REDUCERS === //
import { deleteAvatar } from '../../store/reducers/avatar';

// === COMPONENTS === //
import DeleteButton from '../../components/common/Buttons/DeleteButton';
import InfoBubble from '../../components/common/Buttons/InfoBubble';

export default function AvatarManager() {
  // === Hook Execution Order === /
  const dispatch = useAppDispatch();

  // === Redux states === //
  const avatars = useAppSelector((state) => state.avatar.data);

  return (
    <>
      {/* TITLE */}
      <h1 className="mt-20 mb-5 lg:mt-10">Avatar Manager</h1>

      <section className="p-4 my-5 overflow-x-hidden rounded-lg min-h-[50vh] shadow-custom bg-secondary-50 relative">
        <InfoBubble
          position="bottom-left"
          content="La suppression d'un avatar est irréversible."
          containerClassname='absolute top-2 right-2'
        />
        <h2>Avatars</h2>

        <div className="grid grid-cols-1 gap-4 mt-8 justify-items-center sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {avatars.length ? avatars.map((avatar) => (
            <div key={avatar.id} className="relative">
              <DeleteButton
                className="absolute -top-1 -right-1"
                onClickMethod={() => dispatch(deleteAvatar({ id: avatar.id }))}
              />
              <img
                src={avatar.url}
                alt="Avatar"
                className="w-[150px] aspect-square rounded-full relative"
              />
            </div>
          )) : <em>Pas encore d&apos;avatar</em>}
        </div>
      </section>
    </>
  );
}