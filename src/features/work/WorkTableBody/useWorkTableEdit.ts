import { useEffect, useState } from 'react';

import { useWorkData, WorkType } from 'src/entities';

export default function useWorkTableEdit() {
  const { works, createWork, updateWork, deleteWork } = useWorkData();

  const [editingWorkId, setEditingWorkId] = useState<number | 'root' | null>(
    null,
  );
  const [editedValues, setEditedValues] = useState<Partial<WorkType>>({});

  const [newWorkParentId, setNewWorkParentId] = useState<number | null>(null);

  useEffect(() => {
    if (works && works.length === 0) {
      setEditingWorkId('root');
    }
  }, [works]);

  const handleCreate = async (parentId: number | null = null) => {
    try {
      const newWork: Omit<WorkType, 'id'> = {
        rowName: editedValues.rowName || '',
        salary: Number(editedValues.salary) || 0,
        equipmentCosts: Number(editedValues.equipmentCosts) || 0,
        overheads: Number(editedValues.overheads) || 0,
        estimatedProfit: Number(editedValues.estimatedProfit) || 0,
        parentId,
      };

      await createWork(newWork).unwrap();

      setEditingWorkId(null);
      setNewWorkParentId(null);
      setEditedValues({});
    } catch (err) {
      console.error('Не удалось добавить строку', err);
    }
  };

  const handleUpdate = async (work: WorkType) => {
    try {
      const updatedWork: WorkType = {
        ...work,
        ...editedValues,
      };

      await updateWork(updatedWork).unwrap();

      setEditingWorkId(null);
      setEditedValues({});
    } catch (err) {
      console.error('Не удалось обновить строку', err);
    }
  };

  const handleDelete = async (workId: number, parentId: number | null) => {
    try {
      await deleteWork({ parentId, workId }).unwrap();
    } catch (err) {
      console.error('Не удалось удалить строку', err);
    }
  };

  const createChild = (parentId: number) => {
    setNewWorkParentId(parentId);
    setEditingWorkId('root');
    setEditedValues({});
  };

  const enableEditMode = (id: number) => {
    setEditingWorkId(id);
    setEditedValues({});
  };

  const changeWorkFieldValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof WorkType,
  ) => {
    setEditedValues({
      ...editedValues,
      [field]: e.target.value,
    });
  };

  const saveChanges = (e: React.KeyboardEvent, work?: WorkType) => {
    if (e.key !== 'Enter') {
      return;
    }

    if (editingWorkId === 'root') {
      handleCreate(newWorkParentId);
    } else if (work) {
      handleUpdate(work);
    }
  };

  return {
    handleDelete,
    createChild,
    enableEditMode,
    changeWorkFieldValue,
    saveChanges,
    editedValues,
    editingWorkId,
    newWorkParentId,
  };
}
