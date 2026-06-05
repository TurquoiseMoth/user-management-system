import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return data.map((user: User) => ({
      id: user.id,
      name: user.name,
      username: user.username ?? "",
      email: user.email,
      phone: user.phone ?? "",
      website: user.website ?? "",
      address: {
        street: user.address?.street ?? "",
        suite: user.address?.suite ?? "",
        city: user.address?.city ?? "",
        zipcode: user.address?.zipcode ?? "",
        geo: {
          lat: user.address?.geo?.lat ?? "",
          lng: user.address?.geo?.lng ?? "",
        },
      },
      company: {
        name: user.company?.name ?? "",
        catchPhrase: user.company?.catchPhrase ?? "",
        bs: user.company?.bs ?? "",
      },
    }));
  },
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<Omit<User, "id">>) {
      const nextId =
        state.users.length > 0
          ? Math.max(...state.users.map((user) => user.id)) + 1
          : 1;
      state.users.push({ id: nextId, ...action.payload });
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to load users";
    });
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
