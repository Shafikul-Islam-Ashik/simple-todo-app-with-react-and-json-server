import { useEffect, useState } from "react";
import PageHeader from "../pageHeader/PageHeader";
import "./Todo.scss";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { createToast } from "../../helpers/helpers";
import axios from "axios";

const Todo = () => {
  // todos
  const [todos, setTodo] = useState([]);

  // form management
  const [input, setInput] = useState({
    taskName: "",
    dueDate: "",
    priority: "General",
    status: "Pending",
  });
  // handle input value change
  const handleInputValueChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handleAddTodo form
  const handleAddTodo = async (e) => {
    e.preventDefault();

    // validation
    if (!input.taskName || !input.dueDate) {
      createToast("All fields are required");
    } else {
      // add form inputs to db
      await axios.post("http://localhost:7000/todos", input);
      createToast("data stable", "success");

      // get all todos
      getAllTodos();

      //reset form
      setInput({
        taskName: "",
        dueDate: "",
        priority: "General",
        status: "Pending",
      });
    }
  };

  // get all todos

  const getAllTodos = async () => {
    const response = await axios.get("http://localhost:7000/todos");

    //set todos data to todos state
    setTodo(response.data);
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
            <form onSubmit={handleAddTodo}>
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
                Add
              </button>
            </form>
          </div>

          <div className="filter mt-2">
            <select name="" id="" className="form-select">
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="General">General</option>
              <option value="Important">Important</option>
            </select>
          </div>

          {/* todo content wrapper  */}
          <div className="todo-content-wrapper mt-1">
            <ul>
              {todos.map((item, index) => {
                return (
                  <li key={index}>
                    <div className="left-side">
                      <span>
                        <input type="checkbox" />
                      </span>
                      <div className="left-side-content">
                        <p className="mb-0">{item.taskName}</p>
                        <span className="date me-2">{item.dueDate}</span>

                        {item.priority == "Important" && (
                          <span className="priority important">Important</span>
                        )}
                      </div>
                    </div>
                    <span>
                      <button className="btn btn-sm me-1">
                        <FaEdit />
                      </button>
                      <button className="btn btn-sm">
                        <MdDelete />
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
