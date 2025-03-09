import type { WorkType } from '../../model';

export interface WorkFieldInputProps {
  editedValues: Partial<WorkType>;
  work?: WorkType;
  fieldName: keyof WorkType;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFieldKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
