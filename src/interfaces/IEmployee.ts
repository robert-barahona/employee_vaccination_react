import { IVaccineStatus } from './IVaccineStatus';
export interface IEmployee {
  id?: number;
  ci: string;
  firstNames: string;
  lastNames: string;
  mail: string;
  birthDate?: Date | string | null;
  address?: string | null;
  phone?: string | null;
  userId?: number;
  vaccineStatus?: IVaccineStatus | null;
}