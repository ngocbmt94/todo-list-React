import { useDispatch, useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { fetchTasks, getTasks } from "../redux/tasksSlice";
import { useEffect } from "react";
import FilterTask from "./FilterTask";

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="task-list flex flex-col gap-3 p-10 container bg-gray-900 mx-auto lg:max-w-4xl">
      <FilterTask />
      {tasks.length === 0 && <p className="text-center text-2xl uppercase">No task to show</p>}
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
