import { TableCell } from 'src/shared';
import CreateIcon from 'src/shared/assets/icons/create.png';

import { WORK_FIELDS_LIST } from '../../model';

import { WorkEditTableRowContentProps } from './WorkEditTableRowContent.types';
import styles from './WorkEditTableRowContent.style.module.scss';

// TODO: Собирать конструктор в виджетах, а не здесь
import { WorkFieldInput } from '../WorkFieldInput';

export default function WorkEditTableRowContent(
  props: WorkEditTableRowContentProps,
) {
  const { editedValues, work, level, onFieldChange, onFieldKeyDown } = props;

  return (
    <>
      <TableCell>
        <div
          style={{
            marginLeft: level * 20,
          }}
        >
          <button className={[styles.button, styles.create_button].join(' ')}>
            <img src={CreateIcon} alt="Создать строку" />
          </button>
        </div>
      </TableCell>

      {WORK_FIELDS_LIST.map((workField) => (
        <TableCell key={workField}>
          <WorkFieldInput
            editedValues={editedValues}
            work={work}
            fieldName={workField}
            onFieldChange={(e) => onFieldChange(e, workField)}
            onFieldKeyDown={onFieldKeyDown}
          />
        </TableCell>
      ))}
    </>
  );
}
