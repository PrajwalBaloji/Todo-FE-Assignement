import { useEffect, useReducer } from "react";
import { useTaskContext } from "../TaskContext";
import Button from "../../components/base/Button/Button";
import detailsReducer, { initialState } from "./detailsReducer";
import useKeydownEvent from "../../hooks/useKeydownEvent";

export default function TaskDetails() {
  const {
    titleRef,
    addTask,
    selectedTask,
    updateTask,
    setSelectedTask,
    deleteTask,
    focusTitle,
  } = useTaskContext();
  const [{ details, titleError, descriptionError }, dispatch] = useReducer(
    detailsReducer,
    initialState
  );

  const handleTaskDetails = () => {
    if (titleError || descriptionError || !details.title) return;
    if (selectedTask) {
      const updatedTask = {
        ...selectedTask,
        title: details.title,
        description: details.description,
      };
      updateTask(updatedTask);
      setSelectedTask(null);
    } else {
      const newTask = {
        id: Date.now().toString(),
        title: details.title,
        description: details.description,
        completed: false,
        createdAt: Date.now(),
      };
      addTask(newTask);
    }
    dispatch({ type: "reset" });
    focusTitle();
  };

  const handleEscape = () => {
    setSelectedTask(null);
    dispatch({ type: "reset" });
    focusTitle();
  };

  const handleDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      dispatch({ type: "reset" });
    }
  };

  useKeydownEvent({ key: "Enter", callback: handleTaskDetails });
  useKeydownEvent({ key: "Escape", callback: () => handleEscape() });

  useEffect(() => {
    if (selectedTask) {
      dispatch({
        type: "setInitial",
        payload: {
          title: selectedTask.title,
          description: selectedTask.description,
        },
      });
    } else {
      dispatch({ type: "reset" });
    }
  }, [selectedTask]);

  const renderSecondaryButton = () => {
    if (selectedTask) {
      return (
        <Button appearance="text" variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      );
    }

    if (details.title || details.description) {
      return (
        <Button
          appearance="text"
          variant="secondary"
          onClick={() => dispatch({ type: "reset" })}
        >
          Clear
        </Button>
      );
    }

    return null;
  };

  return (
    <>
      <div className="flex flex-col">
        <input
          ref={titleRef}
          type="text"
          value={details.title}
          placeholder="Enter task title..."
          onChange={(e) =>
            dispatch({ type: "setTitle", payload: e.target.value })
          }
          className="py-2 rounded-md border border-none 
          focus:outline-none text-gray-700 text-sm "
        />
        <p className="text-red-500 text-xs h-2 pt-2 pb-6">{titleError || ""}</p>
      </div>
      <div className="flex flex-col flex-1">
        {/* <label className="text-sm text-gray-600 mb-1">Description</label> */}
        <textarea
          className=" py-2 rounded-md borer-none resize-none h-full min-h-[150px] focus:outline-none text-gray-700 text-sm"
          value={details.description}
          onChange={(e) =>
            dispatch({ type: "setDescription", payload: e.target.value })
          }
          placeholder="Enter task Description..."
        />
        <p className="text-red-500 text-sm">{descriptionError || ""}</p>
      </div>
      <div className="flex items-center justify-end gap-2 mt-6">
        {renderSecondaryButton()}
        <Button
          onClick={handleTaskDetails}
          disabled={!!(titleError || descriptionError || !details.title)}
        >
          {selectedTask ? "Save Changes" : "Add Task"}
        </Button>
      </div>
    </>
  );
}
