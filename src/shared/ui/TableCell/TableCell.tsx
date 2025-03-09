import { TableCellProps } from './TableCell.types';

export default function TableCell(props: TableCellProps) {
  const { onDoubleClick, children } = props;

  return <td onDoubleClick={onDoubleClick}>{children}</td>;
}
