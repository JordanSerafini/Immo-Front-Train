export interface Information {
  id: number;
  type: string;
  owner_name: string;
  owner_email: string;
  address_number: number;
  address_street: string;
  code_zip: number;
  address_city: string;
  address_info: null | string;
  source: string;
  category: string;
  comment: null | string;
  date: string ;
  collaborator_id: number | null;
  sector_id: number;
  notification_date: string;
  phone_1: string;
  phone_2: string;
}