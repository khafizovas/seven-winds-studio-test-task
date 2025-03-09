export interface WorkType {
  id: number;
  equipmentCosts: number;
  estimatedProfit: number;
  overheads: number;
  parentId: number | null;
  rowName: string;
  salary: number;
  child?: WorkType[];
}
