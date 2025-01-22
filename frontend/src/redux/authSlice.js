import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  suggestedUsers: [],
  userProfile: null,
  selectedUser: null,
  updateUserFollowing: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload || null;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload || [];
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload || null;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload || null;
    },
    updateUserFollowing: (state, action) => {
      state.updateUserFollowing = action.payload || null;
    },
    // Add a reset state action for user logout or cleanup
    resetAuthState: () => initialState,
  },
});

export const {
  setAuthUser,
  setSuggestedUsers,
  setUserProfile,
  setSelectedUser,
  updateUserFollowing,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
