import { Office } from './office';

export interface Customer {
  id: number;
  firstname: string;
  lastname: string;
  offices: Array<Office>;
}
