import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  isLoading: false,
  filter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addItem(state, action) {
      action.payload.id = nanoid();
      state.tasks = [action.payload, ...state.tasks];
    },
    deleteItem(state, action) {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },
    chooseItemEdit(state, action) {
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
      const item = state.tasks.find((item) => item.id === action.payload);
      item.isCompleted = !item.isCompleted;
    },
    reOrder(state, action) {
      const { source, destination } = action.payload;
      const newItems = [...state.tasks];
      const [removed] = newItems.splice(source, 1);
      newItems.splice(destination, 0, removed);
      state.tasks = newItems;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { addItem, deleteItem, editItem, chooseItemEdit, checkItem, reOrder, setFilter, setIsLoading } = tasksSlice.actions;
export default tasksSlice.reducer;

export const getTasks = (state) => {
  const filter = state.tasks.filter;
  if (filter === "completed") return state.tasks.tasks.filter((c) => c.isCompleted);
  if (filter === "unCompleted") return state.tasks.tasks.filter((c) => !c.isCompleted);
  return state.tasks.tasks;
};
export const getIsLoading = (state) => state.tasks.isLoading;
export const getFilterValue = (state) => state.tasks.filter;
