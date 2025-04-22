import { configureStore } from '@reduxjs/toolkit';
import SessionSlice from './slices/session';

export const store = configureStore({
  reducer: {
    session: SessionSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
