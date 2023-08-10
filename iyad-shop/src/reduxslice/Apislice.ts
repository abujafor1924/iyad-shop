// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
}

interface UserState {
  users: User[];
  message: string | null;
}

const initialState: UserState = {
  users: [],
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsersSuccess(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    addUserSuccess(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
      state.message = "User added successfully";
    },
    clearMessage(state) {
      state.message = null;
    },
  },
});

export const { getUsersSuccess, addUserSuccess, clearMessage } =
  userSlice.actions;
export default userSlice.reducer;
