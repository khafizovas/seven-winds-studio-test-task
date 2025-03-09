import {
  RecursiveWorkTableRow,
  WorkTableBody,
  WorkTableMessage,
} from 'src/features';
import { TableHeader } from 'src/shared';

import styles from './WorkTable.style.module.scss';

const TABLE_COLUMN_TITLES = [
  'Уровень',
  'Наименование работ',
  'Основаная з/п',
  'Оборудование',
  'Накладные расходы',
  'Сметная прибыль',
];

export default function WorkTable() {
  return (
    <table className={styles.work_table}>
      <TableHeader columnTitles={TABLE_COLUMN_TITLES} />
      <WorkTableBody
        workRenderer={RecursiveWorkTableRow}
        messageRenderer={WorkTableMessage}
      />
    </table>
  );
}
