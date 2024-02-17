import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { getTasks, reOrder } from "../redux/tasksSlice";
import FilterTask from "./FilterTask";

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);

  const onDragEnd = (result) => {
    dispatch(reOrder({ source: result.source.index, destination: result.destination.index }));
  };

  return (
    <div className="task-list flex flex-col gap-3 p-10 container bg-gray-900 mx-auto lg:max-w-4xl">
      <FilterTask />
      {tasks.length === 0 && <p className="text-center text-2xl uppercase">No task to show</p>}
      <ul>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(droppableProvided) => (
              <div {...droppableProvided.draggableProps} {...droppableProvided.dragHandleProps} ref={droppableProvided.innerRef}>
                {tasks.map((item, index) => (
                  <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                    {(draggableProvided, snapshot) => <TaskItem key={item.id} task={item} provided={draggableProvided} snapshot={snapshot} />}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ul>
    </div>
  );
}

export default TaskList;
