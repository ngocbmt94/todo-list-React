import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, editItem, chooseItemEdit, getTasks, checkItem } from "./tasksSlice";
import { deleteTask, patchRequest, puttingRequest } from "../service/apiTasks";

import { useForm } from "react-hook-form";

function TaskItem({ task }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const [editTitile, setEditTitle] = useState("");
  // const [editDescription, setEditDescription] = useState("");
  const tasks = useSelector(getTasks);

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
    deleteTask(id);
  };
  const handleEdit = (id) => {
    const getTaskEdited = tasks.find((el) => el.id === id);

    reset(getTaskEdited);

    dispatch(chooseItemEdit(id));
  };
  async function handleChecked(id) {
    const payload = {
      isCompleted: !task.isCompleted,
    };

    dispatch(checkItem(id));
    await patchRequest(id, payload);
  }

  const onSubmit = async (data) => {
    dispatch(editItem(data.id, data));
    await puttingRequest(data.id, data);
  };

  return (
    <div className="task-item bg-gradient-to-r from-gray-800 to-slate-800 p-5 rounded hover:from-fuchsia-900 cursor-pointer hover:to-gray-800 group">
      <div className=" flex justify-between items-center">
        <div className="task-item-left flex gap-3">
          <span className="self-center">
            <input type="checkbox" disabled={task.isEditting} className="accent-fuchsia-400 cursor-pointer" checked={task.isCompleted || false} onChange={() => handleChecked(task.id)} />
          </span>

          {!task.isEditting && <p className={`group-hover:text-fuchsia-400 uppercase ${task.isCompleted ? "line-through text-gray-500  group-hover:text-fuchsia-600" : null}`}>{task.title}</p>}
        </div>

        <div className="task-item-right flex gap-3 text-gray-500">
          <button onClick={() => handleEdit(task.id)}>
            <FiEdit className="cursor-pointer hover:text-fuchsia-400 duration-300" />
          </button>
          <button onClick={() => handleDelete(task.id)}>
            <FiTrash className="cursor-pointer hover:text-rose-500 duration-300" />
          </button>
        </div>
      </div>
      {!task.isEditting && <p className={` text-sm ml-10 italic font-light group-hover:text-fuchsia-400 ${task.isCompleted ? "line-through text-gray-500  group-hover:text-fuchsia-600" : null}`}>{task.description}</p>}
      {task.isEditting && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input id="id" {...register("id")} hidden />

          <input id="title" {...register("title", { required: true })} className="bg-transparent mb-3 outline-none border-b-2 border-gray-500 pb-1 w-full focus:border-fuchsia-500" type="text" />
          {errors.title && <span>This field is required</span>}

          <input id="description" {...register("description", { required: true })} className="bg-transparent mb-3 outline-none border-b-2 border-gray-500 pb-1 w-full focus:border-fuchsia-500" type="text" />
          {errors.description && <span>This field is required</span>}

          <input type="submit" value="Submit" hidden />
        </form>
      )}
    </div>
  );
}

export default TaskItem;
