import router from "../routes";
import { RouterProvider } from "react-router-dom";
import CustomScrollbar from "./components/shared/CustomScrollbar/CustomScrollbar";

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <CustomScrollbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
