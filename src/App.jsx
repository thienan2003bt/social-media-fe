import { Container } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import UserPage from "./pages/UserPage"
import Header from "./components/Header"

function App() {
  return (
    <Container w={"48vw"} maxW={"48vw"} marginX={"26vw"}>
		<Header/>
		<Routes>
			<Route path='/:username' element={<UserPage />}/>
			<Route path='/:username/post/:pid' element={<UserPage />}/>
		</Routes>

    </Container>
  )
}

export default App
