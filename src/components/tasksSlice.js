import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../service/apiTasks";

const initialState = {
  tasks: [],
  isLoading: false,
  error: "",
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", fetchData);
export const fetchFilterTask = createAsyncThunk("tasks/fetchFilterTask", async (value) => fetchData(value));

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.tasks = [...state.tasks, action.payload];
    },
    deleteItem(state, action) {
      // payload = id
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },
    chooseItemEdit(state, action) {
      // payload = id
      state.tasks = state.tasks.map((el) => (el.id !== action.payload ? { ...el, ...{ isEditting: false } } : { ...el, ...{ isEditting: true } }));
    },
    editItem: {
      prepare(id, task) {
        return { payload: { id, task } };
      },
      reducer(state, action) {
        const item = state.tasks.find((item) => item.id === action.payload.id);

        item.title = action.payload.task.title;
        item.description = action.payload.task.description;
        item.isEditting = false;
      },
    },
    checkItem(state, action) {
      // payload = id
      const item = state.tasks.find((item) => item.id === action.payload);
      item.isCompleted = !item.isCompleted;
    },
    // filterItem(state, action) {
    //   state.tasks = state.tasks.sort(function (a, b) {
    //     const top = a.isCompleted === true ? a.isCompleted : false;
    //     const bottom = b.isCompleted === true ? b.isCompleted : false;

    //     if (action.payload === "completed") return bottom - top;
    //     if (action.payload === "unCompleted") return top - bottom;
    //     return 0;
    //   });
    // },
  },
  extraReducers(builders) {
    builders
      .addCase(fetchTasks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.error = "There was a problem getting your tasks. Make sure to fill this field!";
      })
      .addCase(fetchFilterTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchFilterTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchFilterTask.rejected, (state, action) => {
        state.error = "There was a problem getting  your fillter tasks.";
      });
  },
});

export const { addItem, deleteItem, editItem, chooseItemEdit, checkItem } = tasksSlice.actions;
export default tasksSlice.reducer;

export const getTasks = (state) => state.tasks.tasks;
export const getIsLoading = (state) => state.tasks.isLoading;
