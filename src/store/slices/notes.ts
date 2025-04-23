import { Note } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

export interface INoteState {
    fullNotes: Note[];
    sideNotes: Pick<Note, "title" | "slug">[];
    currentNote: Note | null;

};

const initialState: INoteState = {
    fullNotes: [],
    sideNotes: [],
    currentNote: null
};

export const {
    reducer,
    actions
} = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setNotes: (state, action) => {
            state.fullNotes = action.payload;
        },
        setSideNotes: (state, action) => {
            state.sideNotes = [...state.sideNotes, ...action.payload];
        },
        setCurrentNote: (state, action) => {
            state.currentNote = action.payload;
        },
        addSingleNote: (state, action) => {
            state.fullNotes = [action.payload, ...state.fullNotes];
            state.sideNotes = [{ title: action.payload.title, slug: action.payload.slug }, ...state.sideNotes];
        },
        removeNote: (state, action) => {
            const {
                id,
                slug
            } = action.payload;
            state.sideNotes = state.sideNotes.filter((note) => note.slug !== slug);
            state.fullNotes = state.fullNotes.filter((note) => note.id !== id);
        },
        addNotes: (state, action) => {
            state.fullNotes = [...state.fullNotes, ...action.payload];
        },
        updateSingleNote: (state, action: {
            payload: Note
        }) => {
            const data = action.payload;
            state.sideNotes = state.sideNotes.map((note) => {
                if (note.slug === state.currentNote!.slug) {
                    return {
                        title: action.payload.title,
                        slug: action.payload.slug
                    };
                }
                return note;
            });
            state.fullNotes = state.fullNotes.map((note) => {
                if (note.id === data.id) {
                    return {
                        ...data
                    };
                }
                return note;
            });
        }
    }
});

export const {
    setNotes,
    setSideNotes,
    setCurrentNote,
    addSingleNote,
    removeNote,
    updateSingleNote
} = actions;

export default reducer;