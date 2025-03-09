import type { WorkType } from '../../model';

export interface WorkEditTableRowContentProps {
  editedValues: Partial<WorkType>;
  work?: WorkType;
  level: number;
  onFieldChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof WorkType,
  ) => void;
  onFieldKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    work?: WorkType,
  ) => void;
}
