import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  WorkType,
  GetWorksResponse,
  CreateWorkResponse,
  UpdateWorkResponse,
  DeleteWorkResponse,
} from '../model';
import {
  findNewWorkDestByParentId,
  mapRawWorkToWorkType,
  mapWorkTypeToRawWork,
} from '../lib';

const BASE_URL = 'http://185.244.172.108:8081/';
const ENTITY_ID = 148866;

export const workApi = createApi({
  reducerPath: 'workApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Work'],
  endpoints: (builder) => ({
    getWorks: builder.query<WorkType[], void>({
      query: () => `/v1/outlay-rows/entity/${ENTITY_ID}/row/list`,
      transformResponse: (rawResult: GetWorksResponse[]) => {
        return rawResult.map((item) => mapRawWorkToWorkType(item));
      },
    }),
    createWork: builder.mutation<WorkType, Omit<WorkType, 'id'>>({
      query: (work) => ({
        url: `/v1/outlay-rows/entity/${ENTITY_ID}/row/create`,
        method: 'POST',
        body: mapWorkTypeToRawWork(work),
      }),
      transformResponse: (response: CreateWorkResponse) => {
        return mapRawWorkToWorkType(response.current);
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { parentId } = arg;
          const { data } = await queryFulfilled;

          dispatch(
            workApi.util.updateQueryData('getWorks', undefined, (draft) => {
              const destination = findNewWorkDestByParentId(draft, parentId);
              if (!destination) {
                return;
              }

              destination.push({ ...data, parentId });
            }),
          );
        } catch (err) {
          console.error('Не удалось добавить строку', err);
        }
      },
    }),
    updateWork: builder.mutation<WorkType, WorkType>({
      query: (work) => {
        return {
          url: `/v1/outlay-rows/entity/${ENTITY_ID}/row/${work.id}/update`,
          method: 'POST',
          body: mapWorkTypeToRawWork(work),
        };
      },
      transformResponse: (response: UpdateWorkResponse) => {
        return mapRawWorkToWorkType(response.current);
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { id, parentId, child } = arg;

          dispatch(
            workApi.util.updateQueryData('getWorks', undefined, (draft) => {
              const updatedWorkParentNode = findNewWorkDestByParentId(
                draft,
                parentId,
              );
              if (!updatedWorkParentNode) return;

              const updatedWorkInd = updatedWorkParentNode.findIndex(
                (work) => work.id === id,
              );

              if (updatedWorkInd !== -1) {
                updatedWorkParentNode[updatedWorkInd] = {
                  ...data,
                  child,
                  parentId,
                };
              }
            }),
          );
        } catch (err) {
          console.error('Не удалось обновить строку', err);
        }
      },
    }),
    deleteWork: builder.mutation<
      null,
      { parentId: number | null; workId: number }
    >({
      query: ({ workId }) => ({
        url: `/v1/outlay-rows/entity/${ENTITY_ID}/row/${workId}/delete`,
        method: 'DELETE',
      }),
      transformResponse: (response: DeleteWorkResponse) => {
        return response.current;
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { parentId, workId } = arg;

        const patchResult = dispatch(
          workApi.util.updateQueryData('getWorks', undefined, (draft) => {
            const deletedWorkParentNode = findNewWorkDestByParentId(
              draft,
              parentId,
            );

            if (!deletedWorkParentNode) return;

            const deletedWorkInd = deletedWorkParentNode.findIndex(
              (work) => work.id === workId,
            );

            if (deletedWorkInd !== -1) {
              deletedWorkParentNode.splice(deletedWorkInd, 1);
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          console.error('Не удалось удалить строку', err);
        }
      },
    }),
  }),
});

export const {
  useGetWorksQuery,
  useCreateWorkMutation,
  useUpdateWorkMutation,
  useDeleteWorkMutation,
} = workApi;
