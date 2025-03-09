import type { WorkType } from '../../model';

export interface WorkDisplayTableRowContentProps {
  work: WorkType;
  level: number;
  handleDoubleClick: (workId: number) => void;
  handleAddChild: (workId: number, parentId: number | null) => void;
  handleDelete: (workId: number, parentId: number | null) => void;
}
