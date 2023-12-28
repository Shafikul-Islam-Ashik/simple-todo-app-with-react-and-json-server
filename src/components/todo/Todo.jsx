import { useEffect, useReducer, useState } from "react";
import PageHeader from "../pageHeader/PageHeader";
import "./Todo.scss";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { createToast } from "../../helpers/helpers";
import axios from "axios";

/**
 * todoReducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODO":
      return action.payload;

    case "ADD_TODO":
      return [...state, action.payload];

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "FILTER_TODO":
      return action.payload;

    default:
      state;
  }
};

const Todo = () => {
  const [todo, dispatch] = useReducer(todoReducer, []);

  // state for set and unset update mode of the form
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  // state for check is in All mode or not (in filter option activation) for checkbox handle(completed/pending) instantly
  const [isInAllMode, setIsInAllMode] = useState(true);

  // state for check is in isInGeneral_ImportantMode or not (in filter option activation) for handle important/general instantly
  const [isInGeneral_ImportantMode, setisInGeneral_ImportantMode] =
    useState(false);

  // form management
  const [input, setInput] = useState({
    taskName: "",
    dueDate: "",
    priority: "General",
    completed: false,
  });

  // handle input value change
  const handleInputValueChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * handleSubmit form (create and update in same form)
   * @param {*}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUpdateMode) {
      // Handle update logic here

      // validation
      if (!input.taskName || !input.dueDate) {
        createToast("All fields are required");
      } else {
        // get data from db
        const oldData = await axios.get(
          `http://localhost:7000/todos/${input.id}`
        );

        // update data
        const response = await axios.patch(
          `http://localhost:7000/todos/${input.id}`,
          input
        );

        // if filterOption is in general mode and will update priority to important, then reomve task from general instantly
        // if filterOption is in important mode and will update priority to genetal, then reomve task from important instantly

        // else only update task

        if (
          isInGeneral_ImportantMode &&
          oldData.data.priority !== input.priority
        ) {
          dispatch({ type: "DELETE_TODO", payload: input.id });
        } else {
          dispatch({ type: "UPDATE_TODO", payload: response.data });
        }

        // success message
        createToast("Task updated successful", "success");

        // clear form data after update
        setInput({
          taskName: "",
          dueDate: "",
          priority: "General",
          completed: false,
        });
      }
    } else {
      // Handle create logic here

      // validation
      if (!input.taskName || !input.dueDate) {
        createToast("All fields are required");
      } else {
        // add form inputs to db
        const response = await axios.post("http://localhost:7000/todos", input);

        dispatch({ type: "ADD_TODO", payload: response.data });

        // success message
        createToast("Task added successful", "success");

        // clear form data after submission
        setInput({
          taskName: "",
          dueDate: "",
          priority: "General",
          completed: false,
        });
      }
    }

    // Reset mode to create after submission
    setIsUpdateMode(false);
  }; // handleAddTodo form ends here

  /**
   *
   * handle update mode
   */
  const handleUpdateMode = async (id) => {
    // set update mode true
    setIsUpdateMode(true);

    // get data from db
    const response = await axios.get(`http://localhost:7000/todos/${id}`);

    //pre-fill the form with the data I want to update
    setInput(response.data);
  };

  /**
   *
   *  get all todos
   */
  const getAllTodos = async () => {
    const response = await axios.get("http://localhost:7000/todos");

    //set todos data to todo
    dispatch({ type: "SET_TODO", payload: response.data });
  };

  /**
   *
   *  handleFilter
   */
  const handleFilterTodo = async (e) => {
    // console.log(e.target.value);
    const type = e.target.value;
    let response = [];

    if (type === "All") {
      response = await axios.get(`http://localhost:7000/todos`);

      setIsInAllMode(true);
      setisInGeneral_ImportantMode(false);
    } else if (type === "General" || type === "Important") {
      response = await axios.get(
        `http://localhost:7000/todos?priority=${type}&completed=false`
      );

      setIsInAllMode(false);
      setisInGeneral_ImportantMode(true);
    } else {
      response = await axios.get(
        `http://localhost:7000/todos?completed=${type}`
      );

      setIsInAllMode(false);
      setisInGeneral_ImportantMode(false);
    }

    dispatch({ type: "FILTER_TODO", payload: response.data });
  };

  /**
   *
   * handleDeleteTodo
   */
  const handleDeleteTodo = async (id) => {
    await axios.delete(`http://localhost:7000/todos/${id}`);

    dispatch({ type: "DELETE_TODO", payload: id });

    // message
    createToast("Task deleted successful", "success");
  };

  /**
   *
   *  handleToggle
   */

  const handleToggle = async (id) => {
    // get the data from db
    const oldData = await axios.get(`http://localhost:7000/todos/${id}`);

    // update data true/false (toggle) to db
    const updatedData = await axios.patch(`http://localhost:7000/todos/${id}`, {
      ...oldData.data,
      completed: !oldData.data.completed,
    });

    if (isInAllMode) {
      // update data true/false (toggle) to state
      dispatch({ type: "TOGGLE_TODO", payload: updatedData.data });
    } else {
      // remove data from state
      dispatch({ type: "DELETE_TODO", payload: id });
    }

    // success message
    if (oldData.data.completed) {
      createToast("Set task to pending", "info");
    } else {
      createToast("Set task to completed", "success");
    }
  };

  // call getAllTodos once when page loaded
  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <>
      <PageHeader title="Todo" />

      <div className="wrapper">
        <div className="todo-container">
          <div className="titile">
            <h1>Todo List</h1>
          </div>

          {/* add todo form  */}
          <div className="add-todo-form">
            <form onSubmit={handleSubmit}>
              <div className="task-name">
                <label htmlFor="task-name">Task name</label>
                <input
                  type="text"
                  id="task-name"
                  className="form-control"
                  name="taskName"
                  value={input.taskName}
                  onChange={handleInputValueChange}
                />
              </div>

              <div className="due-date">
                <label htmlFor="due-date">Due date</label>
                <input
                  type="date"
                  id="due-date"
                  className="form-control"
                  name="dueDate"
                  value={input.dueDate}
                  onChange={handleInputValueChange}
                />
              </div>

              <div className="priority">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  className="form-select"
                  name="priority"
                  value={input.priority}
                  onChange={handleInputValueChange}
                >
                  <option value="General">General</option>
                  <option value="Important">Important</option>
                </select>
              </div>

              <button type="submit" className="btn  btn-primary add-task-btn">
                {isUpdateMode ? "Update" : "Add"}
              </button>
            </form>
          </div>

          <div className="filter mt-2">
            <select
              name=""
              id=""
              className="form-select"
              onChange={handleFilterTodo}
            >
              <option value="All">All</option>
              <option value={false}>Pending</option>
              <option value={true}>Completed</option>
              <option value="General">General</option>
              <option value="Important">Important</option>
            </select>
          </div>

          {/* todo content wrapper  */}
          <div className="todo-content-wrapper mt-1">
            <ul>
              {todo?.length > 0 ? (
                todo.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className="left-side">
                        <span>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={() => handleToggle(item.id)}
                            checked={item.completed ? true : false}
                          />
                        </span>
                        <div className="left-side-content">
                          <p
                            className="mb-0"
                            style={{
                              textDecoration: item.completed
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {item.taskName}
                          </p>
                          <span className="date me-2">{item.dueDate}</span>

                          {item.priority == "Important" && (
                            <span className="priority important">
                              Important
                            </span>
                          )}
                        </div>
                      </div>
                      <span>
                        <button
                          className="btn btn-sm me-1"
                          onClick={() => handleUpdateMode(item.id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm"
                          onClick={() => handleDeleteTodo(item.id)}
                        >
                          <MdDelete />
                        </button>
                      </span>
                    </li>
                  );
                })
              ) : (
                <li>No data</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
