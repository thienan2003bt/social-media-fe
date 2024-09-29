import { Container } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"
import UserPage from "./pages/UserPage"
import Header from "./components/Header"
import PostPage from "./pages/PostPage"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import { useRecoilValue } from "recoil"
import userAtom from './atoms/userAtom';
import LogoutButton from "./components/LogoutButton"

function App() {
	const user = useRecoilValue(userAtom);

  return (
    <Container w={"48vw"} maxW={"48vw"} marginX={"26vw"}>
		<Header/>
		<Routes>
			<Route path="/" index element={user.username ? <HomePage /> : <Navigate to="/auth"/>}/>
			<Route path='/auth/' element={<AuthPage />}/>
			<Route path='/:username' element={<UserPage />}/>
			<Route path='/:username/post/:pid' element={<PostPage />}/>
		</Routes>
		
		{user.username && <LogoutButton />}
    </Container>
  )
}

export default App
