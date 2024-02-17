import TaskHeader from "./components/TaskHeader";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import TaskFooter from "./components/TaskFooter";
import Loader from "./component-UI/Loader";
import { getIsLoading } from "./redux/tasksSlice";
import { useSelector } from "react-redux";

function App() {
  const isLoading = useSelector(getIsLoading);

  return (
    <div className="wraper bg-gradient-to-t from-gray-900 to-fuchsia-900 min-h-screen text-xl text-gray-100 flex flex-col py-10">
      <TaskHeader />
      {isLoading && <Loader />}
      <AddTask />
      <TaskList />
      <TaskFooter />
    </div>
  );
}

export default App;
