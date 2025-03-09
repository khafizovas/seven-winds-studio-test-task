import {
  RecursiveWorkTableRow,
  WorkTableBody,
  WorkTableMessage,
} from 'src/features';
import { TableHeader } from 'src/shared';

import styles from './WorkTable.style.module.scss';
import { TABLE_COLUMN_TITLES } from './constants';

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
