import { WorkType } from './workType';

export interface GetWorksResponse extends Omit<WorkType, 'parentId' | 'child'> {
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  supportCosts: number;
  total: number;
  child: GetWorksResponse[];
}

export interface CreateWorkRequest extends Omit<WorkType, 'id'> {
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  supportCosts: number;
}

export interface CreateWorkResponse {
  changed: GetWorksResponse[];
  current: GetWorksResponse;
}

export type UpdateWorkResponse = CreateWorkResponse;

export interface DeleteWorkResponse {
  changed: GetWorksResponse[];
  current: null;
}
