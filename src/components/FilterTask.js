import { useDispatch } from "react-redux";
import { getFilterValue, setFilter } from "../redux/tasksSlice";
import { useSelector } from "react-redux";

function FilterTask() {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);

  return (
    <div className="mb-3">
      <span>Filter : </span>
      <select value={filterValue} onChange={(e) => dispatch(setFilter(e.target.value))} className="bg-transparent text-fuchsia-500 border-2 border-fuchsia-500 px-2 mx-2">
        <option value="unCompleted">unCompleted</option>
        <option value="completed">Completed</option>
        <option value="all">All</option>
      </select>
    </div>
  );
}

export default FilterTask;
