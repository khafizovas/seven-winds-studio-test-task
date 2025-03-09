import type { ReactNode } from 'react';

export interface TableCellProps {
  children: ReactNode;
  onDoubleClick?: () => void;
}
