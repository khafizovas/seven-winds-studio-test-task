import type { WorkType } from '../model';

export function findNewWorkDestByParentId(
  treeRoot: WorkType[],
  targetId: number | null,
): WorkType[] | undefined {
  if (treeRoot.length === 0 || !targetId) {
    return treeRoot;
  }

  if (treeRoot[0].id === targetId) {
    if (!treeRoot[0].child) {
      treeRoot[0].child = [];
    }

    return treeRoot[0].child;
  }

  for (const child of treeRoot[0].child ?? []) {
    const result = findNewWorkDestByParentId([child], targetId);
    if (result) return result;
  }
}
