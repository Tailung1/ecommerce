import router from "../routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div className='app flex flex-col min-h-screen'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
