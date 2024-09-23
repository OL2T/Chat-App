import useRouteElement from './useRouteElement'
import './App.css'

function App() {
  const routeElement = useRouteElement()
  return <>{routeElement}</>
}

export default App
