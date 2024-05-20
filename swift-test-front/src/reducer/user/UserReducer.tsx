import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8002";

export interface User {
  id: number;
  prefixName: string;
  firstName: string;
  lastName: string;
  birthDate: string | string[];
  gender: string;
  nationality: string;
  citizenId: string;
  phoneCode: string;
  phoneNumber: string;
  passport?: string;
  expectSalary: number;
}

interface UserState {
  users: User[];
  status: "idle" | "loading" | "fulfilled" | "rejected";
  error: string | null;
  currentPage: number;
  totalPages: number;
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
  loading: false,
};

//createUser  ========================================================
export const createUser = createAsyncThunk(
  "users/createUser",
  async (user: Omit<User, "id">) => {
    const response = await axios.post<User>(`${URL}/users/createUser`, user);
    return response.data;
  }
);

//fetchUser ========================================================
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page: number) => {
    const response = await axios.get(`${URL}/users/users?page=${page}`);
    return response.data;
  }
);

//Delete User
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id: React.Key[]) => {
    await axios.delete(`${URL}/users/delete`, {
      data: { id },
    });
    return id;
  }
);

export const editUser = createAsyncThunk(
  "users/edit",
  async ({ data, id }: { data: User; id: number }) => {
    const response = await axios.patch(`${URL}/users/edit`, { ...data, id });
    return response.data;
  }
);
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    // create
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      createUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users.push(action.payload);
      }
    );
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "create fail";
    });

    // pending phase fetch
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // fulfilled phase fetch
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<{ users: User[]; totalPages: number }>) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
      }
    );
    // reject phase fetch
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch users";
    });
    // delete
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const deletedIds = action.payload;
      state.users = state.users.filter((user) => !deletedIds.includes(user.id));
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      const editedUser = action.payload;
      const index = state.users.findIndex((user) => user.id === editedUser.id);
      if (index !== -1) {
        state.users[index] = editedUser;
        console.log("a");
      }
    });
  },
});

export const { setPage } = userSlice.actions;
export default userSlice.reducer;
