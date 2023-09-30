export interface User {
  id: number | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  password?: string | undefined;
  phone: string | undefined;
  acces: boolean;
  secret_key: undefined | string;
  role_id: number | undefined;
  url: string | undefined;
}
