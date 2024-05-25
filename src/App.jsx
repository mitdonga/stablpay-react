import './App.css'
import Navbar from "./components/Navbar"
import {
  RouterProvider,
} from "react-router-dom";
import Routers from './routes/index'

function App() {
  return (
    <>
			<Navbar />
			<RouterProvider router={Routers} />
		</>
  )
}

export default App
