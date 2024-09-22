import { useEffect, useState } from 'react'
import Content from './Content'
import NavBar from './NavBar'
import UserLogin from './UserLogin'

export default function Dashboard() {
  const [userId, setUserID] = useState(localStorage.getItem('uid'))
  const [avatar, setAvatar] = useState('')
  const [userName, setUserName] = useState('')

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
  }
  return (
    <>
      {userId ? (
        <div className='flex w-full h-full shadow-md '>
          <NavBar
            userName={userName}
            avatar={avatar}
            handleLogout={handleLogout}
          />
          <Content />
        </div>
      ) : (
        <UserLogin setUserName={setUserName} setAvatar={setAvatar} />
      )}
    </>
  )
}
