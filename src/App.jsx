import { useEffect } from 'react';
import './App.css'
import Navbar from "./components/Navbar"
import { RouterProvider } from "react-router-dom";
import Routers from './routes/index'
import Api from './axios'
import userAtom from "./store/atom/userAtom"
import { useRecoilState } from 'recoil';

function App() {
	const [_, setCurrentUser] = useRecoilState(userAtom)

	async function currentUser() {
		const res = await Api.get("/check")
		setCurrentUser(res.data)
	}

	useEffect(() => {
		if (localStorage.getItem('token') !== null) currentUser()
	}, [])

  return (
    <>
			<Navbar />
			<RouterProvider router={Routers} />
		</>
  )
}

export default App
