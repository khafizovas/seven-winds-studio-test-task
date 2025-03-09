import { TableCellProps } from './TableCell.types';
import styles from './TableCell.style.module.scss';

export default function TableCell(props: TableCellProps) {
  const { onDoubleClick, children } = props;

  return (
    <td
      className={onDoubleClick ? styles.clickable_cell : undefined}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </td>
  );
}
