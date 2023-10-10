// === REDUX HOOKS === //
import { useAppSelector } from '../../hooks/redux';

// === COMPONENTS === //
import CardActionToDo from '../../components/layout/Cards/ActionToDoCard';

// === ASSETS === //
import { actionToDoIcon } from '../../assets';

// === UTILS === //
import filteredActionToDo from '../../utils/filteredActionToDo';

export default function ActionToDo() {
  const informations = useAppSelector((state) => state.information.data);

  const actionToDo = filteredActionToDo(informations);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 mb-6">
        <img
          src={actionToDoIcon}
          alt="Action to do Icon"
          className="w-[50px]"
        />
        <h1>Actions à faire</h1>
      </div>

      <ul className="grid gap-5 lg:grid-cols-2">
        {actionToDo.map((information) => (
          <CardActionToDo key={information.id} {...information} />
        ))}
      </ul>
    </>
  );
}
