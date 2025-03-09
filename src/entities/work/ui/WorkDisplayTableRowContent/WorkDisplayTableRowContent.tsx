import { TableCell } from 'src/shared';

import CreateIcon from 'src/shared/assets/icons/create.png';
import DeleteIcon from 'src/shared/assets/icons/delete.svg';

import { WORK_FIELDS_LIST } from '../../model';

import { WorkDisplayTableRowContentProps } from './WorkDisplayTableRowContent.types';
import styles from './WorkDisplayTableRowContent.styles.module.scss';

export default function WorkDisplayTableRowContent(
  props: WorkDisplayTableRowContentProps,
) {
  const { work, level, handleDoubleClick, handleAddChild, handleDelete } =
    props;
  const { id, parentId } = work;

  const handleCellDoubleClick = () => {
    handleDoubleClick(id);
  };

  return (
    <>
      <TableCell>
        <div
          className={styles.buttons_container}
          style={{
            marginLeft: level * 20,
          }}
        >
          <button
            className={[styles.button, styles.create_button].join(' ')}
            onClick={() => handleAddChild(id, parentId)}
          >
            <img src={CreateIcon} alt="Создать строку" />
          </button>
          <button
            className={[styles.button, styles.delete_button].join(' ')}
            onClick={() => handleDelete(id, parentId)}
          >
            <DeleteIcon />
          </button>
        </div>
      </TableCell>

      {WORK_FIELDS_LIST.map((field) => (
        <TableCell key={field} onDoubleClick={handleCellDoubleClick}>
          {work[field]}
        </TableCell>
      ))}
    </>
  );
}
