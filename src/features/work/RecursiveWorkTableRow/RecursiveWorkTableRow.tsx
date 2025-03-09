import {
  WorkDisplayTableRowContent,
  WorkEditTableRowContent,
  WorkType,
} from 'src/entities';

import type { RecursiveWorkTableRowProps } from './RecursiveWorkTableRow.types';

export default function RecursiveWorkTableRow(
  props: RecursiveWorkTableRowProps,
) {
  const {
    work,
    level,
    editingWorkId,
    editedValues,
    newWorkParentId,
    handleChange,
    handleAddChild,
    handleDelete,
    handleKeyDown,
    handleDoubleClick,
  } = props;

  const onDoubleClick = () => {
    if (editingWorkId) {
      return;
    }
    handleDoubleClick(work.id);
  };

  return (
    <>
      <tr onDoubleClick={onDoubleClick}>
        {editingWorkId === work.id ? (
          <WorkEditTableRowContent
            work={work}
            level={level}
            editedValues={editedValues}
            onFieldChange={handleChange}
            onFieldKeyDown={(e) => handleKeyDown(e, work)}
          />
        ) : (
          <WorkDisplayTableRowContent
            work={work}
            level={level}
            handleDoubleClick={onDoubleClick}
            handleAddChild={handleAddChild}
            handleDelete={handleDelete}
          />
        )}
      </tr>

      {newWorkParentId === work.id && (
        <tr>
          <WorkEditTableRowContent
            editedValues={editedValues}
            level={level + 1}
            onFieldChange={handleChange}
            onFieldKeyDown={handleKeyDown}
          />
        </tr>
      )}

      {work.child?.map((childWork: WorkType) => (
        <RecursiveWorkTableRow
          key={childWork.id}
          work={childWork}
          level={level + 1}
          editingWorkId={editingWorkId}
          editedValues={editedValues}
          newWorkParentId={newWorkParentId}
          handleChange={handleChange}
          handleAddChild={handleAddChild}
          handleDelete={handleDelete}
          handleKeyDown={handleKeyDown}
          handleDoubleClick={handleDoubleClick}
        />
      ))}
    </>
  );
}
