import PageHeader from "../pageHeader/PageHeader";
import "./Todo.scss";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Todo = () => {
  return (
    <>
      <PageHeader title="Todo" />

      <div className="wrapper">
        <div className="todo-container">
          <div className="titile">
            <h1>Todo List</h1>
          </div>
          <div className="add-todo-form">
            <form action="">
              <div className="task-name">
                <label htmlFor="task-name">Task name</label>
                <input type="text" id="task-name" className="form-control" />
              </div>

              <div className="due-date">
                <label htmlFor="due-date">Due date</label>
                <input
                  type="date"
                  name=""
                  id="due-date"
                  className="form-control"
                />
              </div>

              <div className="priority">
                <label htmlFor="priority">Priority</label>
                <select name="" id="priority" className="form-select">
                  <option value="General">General</option>
                  <option value="Important">Important</option>
                </select>
              </div>

              <button className="btn  btn-primary add-task-btn">Add</button>
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

          <div className="todo-content-wrapper mt-1">
            <ul>
              <li>
                <span>go to school</span>
                <span>
                  <button className="btn btn-sm me-1">
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm">
                    <MdDelete />
                  </button>
                </span>
              </li>

              <li>
                <span>go to school</span>
                <span>
                  <button className="btn btn-sm me-1">
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm">
                    <MdDelete />
                  </button>
                </span>
              </li>

              <li>
                <span>go to school</span>
                <span>
                  <button className="btn btn-sm me-1">
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm">
                    <MdDelete />
                  </button>
                </span>
              </li>

              <li>
                <span>go to school</span>
                <span>
                  <button className="btn btn-sm me-1">
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm">
                    <MdDelete />
                  </button>
                </span>
              </li>
              <li>
                <span>go to school</span>
                <span>
                  <button className="btn btn-sm me-1">
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm">
                    <MdDelete />
                  </button>
                </span>
              </li>

              <li>
                <span>go to school</span>
                <span>
                  <button className="btn btn-sm me-1">
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm">
                    <MdDelete />
                  </button>
                </span>
              </li>

              <li>
                <span>go to school</span>
                <span>
                  <button className="btn btn-sm me-1">
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm">
                    <MdDelete />
                  </button>
                </span>
              </li>

              <li>
                <span>go to school</span>
                <span>
                  <button className="btn btn-sm me-1">
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm">
                    <MdDelete />
                  </button>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
