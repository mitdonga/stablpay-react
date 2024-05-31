import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import CompanyForm from "../components/CompanyForm";
import AuthRoute from "./AuthRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home path="home"/>
  },
  {
    path: "/edit-company",
    element: <AuthRoute component={<CompanyForm />} role="business_owner" />
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