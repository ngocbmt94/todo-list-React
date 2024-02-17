import { useDispatch } from "react-redux";
import { addItem } from "../redux/tasksSlice";
import FormTask from "./FormTask";

function AddTask() {
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    data.isCompleted = false;
    dispatch(addItem(data));
  };

  return (
    <div className="bg-gray-900 p-10 container mx-auto lg:max-w-4xl">
      <FormTask onSubmit={onSubmit} layout="row" />
    </div>
  );
}

export default AddTask;
