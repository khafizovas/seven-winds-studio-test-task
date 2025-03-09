import { configureStore } from '@reduxjs/toolkit';

import { workApi } from 'src/entities';

export const store = configureStore({
  reducer: {
    [workApi.reducerPath]: workApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(workApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
