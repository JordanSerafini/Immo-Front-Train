// Typescript interface
import { Information } from '../@types/information';

export default function filteredUpcomingAction(informations: Information[]) {
  const currentDate = new Date();
  const ISOCurrentDate = currentDate.toISOString();

  const actionToDo = informations.filter(
    (information) => information.notification_date > ISOCurrentDate
  );

  // Sort by the most recent date 22/09/2023 => 23/09/2023
  const sortedActionsToDo = Object.values(actionToDo).sort((a, b) =>
    a.notification_date.localeCompare(b.notification_date)
  );

  return sortedActionsToDo;
}
