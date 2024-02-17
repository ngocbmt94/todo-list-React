import { useDispatch } from "react-redux";
import { FiEdit, FiTrash } from "react-icons/fi";
import { deleteItem, editItem, chooseItemEdit, checkItem } from "../redux/tasksSlice";
import FormTask from "./FormTask";

function TaskItem({ task, provided, snapshot }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const handleEdit = (id) => {
    dispatch(chooseItemEdit(id));
  };

  const onSubmit = async (data) => {
    dispatch(editItem(data.id, data));
  };

  async function handleChecked(id) {
    dispatch(checkItem(id));
  }

  return (
    <li ref={provided.innerRef} snapshot={snapshot} {...provided.draggableProps} {...provided.dragHandleProps} className="task-item my-2 bg-gradient-to-r from-gray-800 to-slate-800 p-5 rounded hover:from-fuchsia-900  hover:to-gray-800 group">
      <div className=" flex justify-between items-center">
        <div className="task-item-left flex gap-3">
          <span className="self-center">
            <input type="checkbox" disabled={task.isEditting} className="accent-fuchsia-400 w-5 h-5 cursor-pointer" checked={task.isCompleted || false} onChange={() => handleChecked(task.id)} />
          </span>

          {!task.isEditting && <p className={`group-hover:text-fuchsia-400 uppercase ${task.isCompleted ? "line-through text-gray-500  group-hover:text-fuchsia-600" : null}`}>{task.title}</p>}
        </div>

        <div className="task-item-right flex gap-3 text-gray-500">
          <button onClick={() => handleEdit(task.id)}>
            <FiEdit className="cursor-pointer hover:text-fuchsia-400 duration-300 w-6 h-6" />
          </button>
          <button onClick={() => handleDelete(task.id)}>
            <FiTrash className="cursor-pointer hover:text-rose-500 duration-300 w-6 h-6" />
          </button>
        </div>
      </div>
      {!task.isEditting && <p className={` text-sm ml-10 italic font-light group-hover:text-fuchsia-400 ${task.isCompleted ? "line-through text-gray-500  group-hover:text-fuchsia-600" : null}`}>{task.description}</p>}
      {task.isEditting && <FormTask key={task.id} onSubmit={onSubmit} data={{ ...task, ...{ isEditting: undefined } }} layout="col" />}
    </li>
  );
}

export default TaskItem;
