import Home from "./pages/Home"
import Landing from "./pages/Landing"



const App = () => {
  return isLoggedIn() ? <Home /> : <Landing />
}

export default App
function isLoggedIn() {
  return false
}

