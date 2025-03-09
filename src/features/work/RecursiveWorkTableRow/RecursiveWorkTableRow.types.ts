import type { WorkType } from 'src/entities';

export interface RecursiveWorkTableRowProps {
  work: WorkType;
  level: number;
  editingWorkId: number | 'root' | null;
  editedValues: Partial<WorkType>;
  newWorkParentId: number | null;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof WorkType,
  ) => void;
  handleAddChild: (parentId: number) => void;
  handleDelete: (workId: number, parentId: number | null) => Promise<void>;
  handleKeyDown: (e: React.KeyboardEvent, work?: WorkType) => void;
  handleDoubleClick: (id: number) => void;
}
