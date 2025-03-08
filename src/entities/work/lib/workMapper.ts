import { CreateWorkRequest, GetWorksResponse, WorkType } from '../model';

export const mapRawWorkToWorkType = (item: GetWorksResponse): WorkType => ({
  id: item.id,
  equipmentCosts: item.equipmentCosts,
  estimatedProfit: item.estimatedProfit,
  overheads: item.overheads,
  parentId: 0, // TODO
  rowName: item.rowName,
  salary: item.salary,
});

export const mapWorkTypeToRawWork = (work: WorkType): CreateWorkRequest => ({
  equipmentCosts: work.equipmentCosts,
  estimatedProfit: work.estimatedProfit,
  overheads: work.overheads,
  parentId: work.parentId,
  rowName: work.rowName,
  salary: work.salary,
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  supportCosts: 0,
});
