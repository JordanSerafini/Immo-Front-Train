// === REACT === //
import { FormEvent } from "react";

// === TYPESCRIPT === //
interface EditFormProps {
  submitMethod: (event: FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export default function EditForm({ submitMethod, children }: EditFormProps) {
  return (
    <form onSubmit={submitMethod} className="mt-5 max-w-[300px]">
      {children}
    </form>
  );
}
