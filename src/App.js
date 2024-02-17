import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { getIsLoading } from "./components/tasksSlice";
import { useSelector } from "react-redux";

function App() {
  const isLoading = useSelector(getIsLoading);

  return (
    <div className="wraper bg-gradient-to-t from-gray-900 to-fuchsia-900 min-h-screen text-xl text-gray-100 flex flex-col py-10">
      <Header />
      {isLoading && <Loader />}
      <AddTask />
      <TaskList />
      <Footer />
    </div>
  );
}

export default App;
