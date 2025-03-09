import { TableHeaderProps } from './TableHeader.types';
import styles from './TableHeader.style.module.scss';

export default function TableHeader(props: TableHeaderProps) {
  const { columnTitles } = props;

  return (
    <thead className={styles.table_header}>
      <tr>
        {columnTitles.map((title) => (
          <th key={title} className={styles.table_header_cell}>
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}
