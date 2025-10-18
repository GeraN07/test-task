import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import EditUser from "./pages/EditUser/EditUser";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/edit/:id", element: <EditUser /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
