// === REACT === //
import { useEffect } from 'react';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// === REDUCERS === //
import { fetchActions } from '../../../store/reducers/action';

// === COMPONENTS === //
import ActionCard from '../Cards/ActionCard';

export default function ActionManagerSection({ infoId }: { infoId: number }) {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REDUX STATES === //
  const actionState = useAppSelector((state) => state.action);
  const { data: actions, loading } = actionState;

  // === EFFECTS === //
  useEffect(() => {
    dispatch(fetchActions({ infoId }));
  }, [dispatch, infoId]);

  return (
    <section className="relative max-w-[600px] 2xl:w-full p-4 m-auto mt-10 rounded-lg shadow-custom bg-secondary-50">
      <h2>Historique des actions</h2>

      <ul className="flex flex-col gap-4 mx-2 my-4">
        {!loading &&
          actions.map((action) => <ActionCard key={action.id} {...action} />)}
      </ul>
    </section>
  );
}
