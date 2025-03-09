import { useWorkData, WorkEditTableRowContent } from 'src/entities';

import type { WorkTableBodyProps } from './WorkTableBody.types';
import styles from './WorkTableBody.style.module.scss';
import useWorkTableEdit from './useWorkTableEdit';

export default function WorkTableBody(props: WorkTableBodyProps) {
  const { workRenderer: WorkRenderer, messageRenderer: MessageRenderer } =
    props;

  const { works } = useWorkData();

  const {
    handleDelete,
    createChild,
    enableEditMode,
    changeWorkFieldValue,
    saveChanges,
    editedValues,
    editingWorkId,
    newWorkParentId,
  } = useWorkTableEdit();

  return (
    <>
      {
        <tbody className={styles.table_body}>
          <MessageRenderer />

          {Array.isArray(works) && !works.length && (
            <tr>
              <WorkEditTableRowContent
                editedValues={editedValues}
                level={0}
                onFieldChange={changeWorkFieldValue}
                onFieldKeyDown={saveChanges}
              />
            </tr>
          )}

          {Array.isArray(works) &&
            !!works.length &&
            works.map((work) => (
              <WorkRenderer
                key={work.id}
                work={work}
                level={0}
                editingWorkId={editingWorkId}
                editedValues={editedValues}
                newWorkParentId={newWorkParentId}
                handleChange={changeWorkFieldValue}
                handleKeyDown={saveChanges}
                handleAddChild={createChild}
                handleDelete={handleDelete}
                handleDoubleClick={enableEditMode}
              />
            ))}
        </tbody>
      }
    </>
  );
}
