export interface ProspectionInformationType {
  id: number;
  type: string;
  owner_name: string;
  owner_email: string;
  adress_number: number;
  adress_street: string;
  code_zip: number;
  adress_city: string;
  adress_info: null | string;
  source: string;
  category: string;
  comment: null | string;
  date: string;
  collaborator_id: number;
  sector_id: number;
}
