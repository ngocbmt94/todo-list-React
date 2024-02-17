import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "./tasksSlice";
import { postTask } from "../service/apiTasks";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  async function handleSubmitTask(e) {
    e.preventDefault();

    const payload = {
      title,
      description,
      isCompleted: false,
    };

    const task = await postTask(payload);
    dispatch(addItem(task));
    setTitle("");
    setDescription("");
  }

  return (
    <form className="bg-gray-900 p-10 container mx-auto flex flex-col gap-5 justify-center items-center md:flex-row md:justify-between lg:max-w-4xl" onSubmit={(e) => handleSubmitTask(e)}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} required type="text" placeholder="Add title..." className="bg-transparent outline-none border-b-2 border-gray-500 py-2 px-5 text-center md:text-left focus:border-fuchsia-400 duration-300" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} required type="text" placeholder="Add description..." className="bg-transparent outline-none border-b-2 border-gray-500 py-2 px-5 text-center md:text-left focus:border-fuchsia-400 duration-300" />
      <button type="submit" className="border-2 border-fuchsia-500 py-2 px-5 bg-fuchsia-500/10 text-fuchsia-500 hover:bg-fuchsia-500 duration-300 hover:text-gray-900 ">
        Add task
      </button>
    </form>
  );
}

export default AddTask;
