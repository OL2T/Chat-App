import { useEffect, useState } from 'react'
import Content from './Content'
import NavBar from './NavBar'
import UserLogin from './UserLogin'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [userId, setUserID] = useState(localStorage.getItem('uid'))
  const [avatar, setAvatar] = useState('')
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (userId) {
      const user = JSON.parse(localStorage.getItem('users')).find(
        (user) => user.uid === Number(localStorage.getItem('uid'))
      )
      setUserName(user.name)
      setAvatar(user.avatar)
    }
  }, [userId])

  const handleLogout = () => {
    localStorage.removeItem('uid')
    setUserID(null)
    navigate('/')
  }
  return (
    <>
      <div className='relative bg-gradient-to-tr from-[#A07BF4] to-[#F9B6BD] h-dvh w-full '>
        {userId ? (
          <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[1200px] h-full max-w-[1200px] max-h-[700px] shadow-lg'>
            <div className='flex w-full h-full shadow-md '>
              <NavBar
                userName={userName}
                avatar={avatar}
                handleLogout={handleLogout}
              />
              <Content />
            </div>
          </div>
        ) : (
          <UserLogin setUserName={setUserName} setAvatar={setAvatar} />
        )}
      </div>
    </>
  )
}
