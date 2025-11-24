import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core"
import Home from "./pages/Home"
import Landing from "./pages/Landing"
import "./App.css"

const App = () => {
  return useIsLoggedIn() ? <Home /> : <Landing />
}

export default App


