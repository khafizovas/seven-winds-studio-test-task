import { CreateWorkRequest, GetWorksResponse, WorkType } from '../model';

export const mapRawWorkToWorkType = (
  item: GetWorksResponse,
  parentId?: number,
): WorkType => ({
  id: item.id,
  equipmentCosts: item.equipmentCosts,
  estimatedProfit: item.estimatedProfit,
  overheads: item.overheads,
  parentId: parentId ?? null,
  rowName: item.rowName,
  salary: item.salary,
  child: item.child?.map((childWork) =>
    mapRawWorkToWorkType(childWork, item.id),
  ),
});

export const mapWorkTypeToRawWork = (
  work: Omit<WorkType, 'id'>,
): CreateWorkRequest => ({
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
