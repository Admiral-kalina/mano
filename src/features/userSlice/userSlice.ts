import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserState {
    preferredLanguage: string;
}

const initialState: UserState = {
    preferredLanguage: 'EN',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserLanguage: (state, action: PayloadAction<string>) => {
            state.preferredLanguage = action.payload;
            localStorage.setItem('preferredLanguage', action.payload)
        },
    },
});

export const { changeUserLanguage } = userSlice.actions;

export default userSlice.reducer;