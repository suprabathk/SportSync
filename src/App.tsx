import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
  return (
    <div className="font-lexend-deca">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
