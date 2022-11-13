export interface IVaccineStatus {
  id?: number;
  isVaccinated?: boolean | null;
  vaccine?: string | null;
  date?: Date | string | null;
  doses?: number | null;
  employeeId?: number;
}