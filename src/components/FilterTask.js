import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFilterTask } from "../redux/tasksSlice";

function FilterTask() {
  const [value, setValue] = useState("all");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilterTask(value));
  }, [value, dispatch]);

  return (
    <div className="mb-3">
      <span>Filter : </span>
      <select value={value} onChange={(e) => setValue(e.target.value)} className="bg-transparent text-fuchsia-500 border-2 border-fuchsia-500 px-2 mx-2">
        <option value="unCompleted">unCompleted</option>
        <option value="completed">Completed</option>
        <option value="all">All</option>
      </select>
    </div>
  );
}

export default FilterTask;
