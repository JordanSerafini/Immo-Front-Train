export interface User {
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  password?: string | null;
  phone: string | null;
  acces: boolean;
  secret_key: null | string;
  role_id: number | null;
  avatar_id: number | null;
  logged: boolean;
}
