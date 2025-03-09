import { TableCell } from 'src/shared';

import { WORK_FIELDS_LIST } from '../../model';
import { WorkEditTableRowContentProps } from './WorkEditTableRowContent.types';

// TODO: Вынести
import { WorkFieldInput } from '../WorkFieldInput';
//

export default function WorkEditTableRowContent(
  props: WorkEditTableRowContentProps,
) {
  const { editedValues, work, level, onFieldChange, onFieldKeyDown } = props;

  return (
    <>
      <TableCell>{level}</TableCell>
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
