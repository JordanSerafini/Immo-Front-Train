// Redux
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// Action Reducer
import { fetchActions } from '../../../store/reducers/action';

// Components
import ActionCard from '../ActionCard/ActionCard';

export default function ActionSection({ infoId }: { infoId: number }) {
    // Hook Execution Order
    const dispatch = useAppDispatch();

    const actions = useAppSelector((state) => state.actions.data);

    useEffect(() => {
        dispatch(fetchActions({infoId}))
    }, [dispatch, infoId])

  return (
    <section className="relative max-w-[600px] 2xl:w-full p-4 m-auto mt-10 rounded-lg shadow-custom bg-secondary-50">
      <h2>Historique des actions</h2>

      <ul className="flex flex-col gap-4 mx-2 my-4">
        {actions.map(action => (
            <ActionCard key={action.id} {...action} />
        ))}
      </ul>
    </section>
  );
}
