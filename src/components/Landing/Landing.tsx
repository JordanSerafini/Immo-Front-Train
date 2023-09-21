import { Link } from "react-router-dom";

// This file is temporary, it's useful to navigate while the server is running for the first time

export default function Landing() {
  return (
    <ul>
      <li className="underline">
        <Link to="/login">Login</Link>
      </li>
      <li className="underline">
        <Link to="/support">Support</Link>
      </li>
      <li className="underline">
        <Link to="/support/confirmation">Support Confirmation</Link>
      </li>
      <li className="underline">
        <Link to="/app/prospection">Prospection</Link>
      </li>
    </ul>
  );
}
