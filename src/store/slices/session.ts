import { User } from "@prisma/client";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

export interface ISessionState {
    isLoggedIn: boolean;
    isLoaded: boolean;
    user: User | null;
    session: Session | null
};

const initialState: ISessionState = {
    isLoggedIn: false,
    isLoaded: false,
    user: null,
    session: null
};

const {
    reducer,
    actions
} = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSession: (state, action) => {
            const {
                session,
                ...rest
            } = action.payload;
            state.isLoggedIn = true;
            state.isLoaded = true;
            state.user = rest;
            state.session = session
        },
        clearSession: (state) => {
            state.isLoggedIn = false;
            state.isLoaded = false;
            state.user = null;
            state.session = null
        },
        updateUser: (state, action: {
            payload: User
        }) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logOut, (state) => {
            state.isLoggedIn = false;
            state.isLoaded = false;
            state.user = null;
        });
    }
});

export const {
    setSession,
    clearSession,
    updateUser
} = actions;

export const logOut = createAction('logout');

export default reducer;