import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home path="home"/>
  },
	{
		path: "/login",
		element: <Login />
	},
	{
		path: "/signup",
		element: <Signup />
	}
]);

export default routes;