import { configureStore } from '@reduxjs/toolkit';
import SessionSlice from './slices/session';
import NoteSlice from './slices/notes';

export const store = configureStore({
  reducer: {
    session: SessionSlice,
    notes: NoteSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
