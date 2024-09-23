import useRouteElement from './useRouteElement'
import './App.css'

function App() {
  const routeElement = useRouteElement()
  return (
    <>
      <div className='relative bg-gradient-to-tr from-[#A07BF4] to-[#F9B6BD] h-dvh w-full '>
        <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[1200px] h-full max-w-[1200px] max-h-[700px]'>
          {routeElement}
        </div>
      </div>
    </>
  )
}

export default App
