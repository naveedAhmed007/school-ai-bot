import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AvatarState {
    avatarId: number | null;
}

const initialState: AvatarState = {
    avatarId: null,
};

const avatarSlice = createSlice({
    name: 'avatar',
    initialState,
    reducers: {
        setAvatarId(state, action: PayloadAction<number>) {
            state.avatarId = action.payload;
        },
        clearAvatar(state) {
            state.avatarId = null;
        },
    },
});

export const { setAvatarId, clearAvatar } = avatarSlice.actions;
export default avatarSlice.reducer;
