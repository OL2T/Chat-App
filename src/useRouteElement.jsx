import { useRoutes } from 'react-router-dom'
import PropertiesChat from './Pages/PropertiesChat'
import Documents from './Pages/Documents'
import Offers from './Pages/Offers'
import Settings from './Pages/Settings'
import Calendar from './Pages/Calendar'
import Dashboard from './components/Dashboard'
import Chat from './Pages/Chat'

export default function useRouteElement() {
  const routeElement = useRoutes([
    // {
    //   path: '/',
    //   element: <UserLogin />
    // },
    {
      path: '/',
      element: <Dashboard />,
      children: [
        { path: 'chat', element: <Chat /> },
        { path: 'properties', element: <PropertiesChat /> },
        { path: 'documents', element: <Documents /> },
        { path: 'offers', element: <Offers /> },
        { path: 'settings', element: <Settings /> },
        { path: 'calendar', element: <Calendar /> }
      ]
    }
  ])
  return routeElement
}
