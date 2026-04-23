import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";

// Routes
import Home from "./views/Home";

function Layout() {
  return <Outlet />;
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
