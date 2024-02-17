import { useDispatch } from "react-redux";
import { addItem } from "./tasksSlice";
import { postTask } from "../service/apiTasks";
import FormTask from "./FormTask";

function AddTask() {
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    data.isCompleted = false;
    const task = await postTask(data);
    dispatch(addItem(task));
  };

  return (
    <div className="bg-gray-900 p-10 container mx-auto lg:max-w-4xl">
      <FormTask onSubmit={onSubmit} layout="row" />
    </div>
  );
}

export default AddTask;
