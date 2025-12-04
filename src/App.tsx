import "./App.css";
import { QuestionaryForm } from "./pages/QuestionaryPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <QuestionaryForm />
    </>
  );
}

export default App;
