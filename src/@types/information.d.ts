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
  date: string;
  collaborator_id: number;
  sector_id: number;
}

export interface CreateInformation {
  type: string;
  owner_name: string;
  owner_email: string;
  address_number: string;
  address_street: string;
  code_zip: string;
  address_city: string;
  address_info: string;
  source: string;
  category: string;
  comment: string;
  date: string;
  collaborator_id: number | null;
  sector_id: number;
}
