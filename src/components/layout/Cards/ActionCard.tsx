// === TYPESCRIPT === //
import { Action } from '../../../@types/action';

// === UTILS === //
import formatDate from '../../../utils/formatDate';

export default function ActionCard({
  date,
  description,
}: Action) {
  return (
    <li>
      <p className="mb-1">Le {formatDate(date)}</p>
      <p className="p-4 rounded-md text-md sm:text-lg bg-secondary-100">
        {description as string}
      </p>
    </li>
  );
}
