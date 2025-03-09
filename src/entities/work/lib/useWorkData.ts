import {
  useGetWorksQuery,
  useCreateWorkMutation,
  useUpdateWorkMutation,
  useDeleteWorkMutation,
} from '../api';

export function useWorkData() {
  const {
    data: works,
    isLoading: isGetting,
    isError: getIsError,
    error: getError,
  } = useGetWorksQuery();

  const [
    createWork,
    { isLoading: isCreating, isError: createIsError, error: createError },
  ] = useCreateWorkMutation();

  const [
    updateWork,
    { isLoading: isUpdating, isError: updateIsError, error: updateError },
  ] = useUpdateWorkMutation();

  const [
    deleteWork,
    { isLoading: isDeleting, isError: deleteIsError, error: deleteError },
  ] = useDeleteWorkMutation();

  const isLoading = isGetting || isCreating || isUpdating || isDeleting;
  const isError = getIsError || createIsError || updateIsError || deleteIsError;
  const error = getError || createError || updateError || deleteError;

  return {
    works,
    createWork,
    updateWork,
    deleteWork,
    isLoading,
    isError,
    error,
  };
}
