import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core"
import Home from "./pages/Home"
import Landing from "./pages/Landing"



const App = () => {
  return useIsLoggedIn() ? <Home /> : <Landing />
}

export default App


