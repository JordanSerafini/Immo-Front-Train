// === REDUX HOOKS === //
import { useAppSelector } from '../../hooks/redux';

// === COMPONENTS === //
import CardUpcomingAction from '../../components/layout/Cards/UpcomingActionCard';

// === ASSETS === //
import { upcomingActionIcon } from '../../assets';

// === UTILS === //
import filteredUpcomingAction from '../../utils/filteredUpcomingAction';

export default function UpcomingAction() {
  const informations = useAppSelector((state) => state.information.data);

  const upcomingAction = filteredUpcomingAction(informations);
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 mb-6">
        <img
          src={upcomingActionIcon}
          alt="Upcoming Action Icon"
          className="w-[50px]"
        />
        <h1>Actions à venir</h1>
      </div>

      <ul className="grid gap-5 lg:grid-cols-2">
        {upcomingAction.map((information) => (
          <CardUpcomingAction key={information.id} {...information} />
        ))}
      </ul>
    </>
  );
}
