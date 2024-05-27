import { useEffect } from 'react';
import './App.css'
import Navbar from "./components/Navbar"
import { RouterProvider } from "react-router-dom";
import Routers from './routes/index'
import api from './axios'

async function currentUser() {
	await api.get("/check")
}

function App() {
	useEffect(() => {
		currentUser()
	}, [])

  return (
    <>
			<Navbar />
			<RouterProvider router={Routers} />
		</>
  )
}

export default App
