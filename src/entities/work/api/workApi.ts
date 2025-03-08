import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  WorkType,
  GetWorksResponse,
  CreateWorkResponse,
  UpdateWorkResponse,
  DeleteWorkResponse,
} from '../model';
import { mapRawWorkToWorkType, mapWorkTypeToRawWork } from '../lib';

const BASE_URL = 'http://185.244.172.108:8081/';
const ENTITY_ID = 148866;

/*
{
    "id": 148866,
    "rowName": "cda1cedf-55f1-4f90-893e-29dfa735911d"
}
*/

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
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Work' as const, id })),
              { type: 'Work', id: 'LIST' },
            ]
          : [{ type: 'Work', id: 'LIST' }],
    }),
    createWork: builder.mutation<WorkType, WorkType>({
      query: (work) => ({
        url: `/v1/outlay-rows/entity/${ENTITY_ID}/row/create`,
        method: 'POST',
        body: mapWorkTypeToRawWork(work),
      }),
      transformResponse: (response: CreateWorkResponse) => {
        return mapRawWorkToWorkType(response.current);
      },
      invalidatesTags: [{ type: 'Work', id: 'LIST' }],
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
      invalidatesTags: (_result, _error, arg) => [{ type: 'Work', id: arg.id }],
    }),
    deleteWork: builder.mutation<WorkType, WorkType>({
      query: (work) => ({
        url: `/v1/outlay-rows/entity/${ENTITY_ID}/row/${work.id}/delete`,
        method: 'DELETE',
      }),
      transformResponse: (response: DeleteWorkResponse) => {
        return mapRawWorkToWorkType(response.current);
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Work', id: arg.id },
        { type: 'Work', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetWorksQuery,
  useCreateWorkMutation,
  useUpdateWorkMutation,
  useDeleteWorkMutation,
} = workApi;
