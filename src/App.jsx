import "./App.scss";

import { ToastContainer } from "react-toastify";
import Todo from "./components/todo/Todo";

function App() {
  return (
    <>
      <Todo />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
