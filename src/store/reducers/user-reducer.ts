
import {createSlice} from '@reduxjs/toolkit';

import {RegisteredUser} from '../../types/user';

interface UserState {
    token: string | null
    user: RegisteredUser | null
}

let parsedUser: RegisteredUser | null = null;
const storageUser: string | null = localStorage.getItem('user');

if (storageUser) {
    parsedUser = JSON.parse(storageUser);
}

const initialState: UserState = {
    token: localStorage.getItem('token') || null,
    user: parsedUser,
}

export const UserReducer = createSlice({
        name: 'user',
        initialState,
        reducers: {
            setToken: (state, token) => {
                state.token = token.payload;
            },
            setUser: (state, user) => {
                state.user = user.payload;
            },
            logout: state => {
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                state.user = null;
            },
        }
    }
);

export default UserReducer.reducer;
export const { setToken, setUser, logout } = UserReducer.actions;
