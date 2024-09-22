import { useState } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const users = [
  {
    uid: 1,
    name: 'User1',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [2, 3, 4, 5, 6]
  },
  {
    uid: 2,
    name: 'User2',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [1, 3, 4, 5, 6]
  },
  {
    uid: 3,
    name: 'user3',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [1, 2, 4, 5, 6]
  },
  {
    uid: 4,
    name: 'user4',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [1, 2, 3, 5, 6]
  },
  {
    uid: 5,
    name: 'user5',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [1, 2, 3, 4, 6]
  },
  {
    uid: 6,
    name: 'user6',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [1, 2, 3, 4, 5]
  }
]
const data = [
  {
    mId: 1,
    message: 'Im Tai',
    timestamp: 12312321312,
    senderId: 1,
    receiverId: 2
  },
  {
    mId: 2,
    message: 'Tony',
    timestamp: 12312321312,
    senderId: 2,
    receiverId: 1
  },
  {
    mId: 3,
    message: '5',
    timestamp: 12312321312,
    senderId: 1,
    receiverId: 2
  },
  {
    mId: 4,
    message: 'Hello',
    timestamp: 12312321312,
    senderId: 1,
    receiverId: 2
  },
  {
    mId: 5,
    message: 'day la message 1 -> 5',
    timestamp: 12312321312,
    senderId: 1,
    receiverId: 5
  },
  {
    mId: 6,
    message: 'day la message 5 -> 1',
    timestamp: 12312321312,
    senderId: 5,
    receiverId: 1
  },
  {
    mId: 7,
    message: 'Hello',
    timestamp: 12312321312,
    senderId: 1,
    receiverId: 2
  }
]
export default function UserLogin({ setUser, setAvatar }) {
  const [uid, setUid] = useState('')

  const handleUserLogin = () => {
    if (!uid) return
    if (
      localStorage.getItem('data') === null &&
      localStorage.getItem('users') === null
    ) {
      localStorage.setItem('users', JSON.stringify(users))
      localStorage.setItem('data', JSON.stringify(data))
    }
    localStorage.setItem('uid', uid)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem(
      'avatar',
      `https://picsum.photos/id/${_.random(1, 1000)}/200/300`
    )
    setUser(uid)
    setAvatar(localStorage.getItem('avatar'))
  }

  return (
    <div>
      <h1 className='text-4xl font-bold text-center mb-8'>
        Welcome to my Chat App
      </h1>
      <form
        onSubmit={handleUserLogin}
        className='bg-white max-w-[480px] m-auto p-4 rounded-md'
      >
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-gray-700 font-bold mb-2'
            >
              User ID:
            </label>
            <input
              type='text'
              name='name'
              id='name'
              required
              onChange={(e) => setUid(e.target.value)}
              className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  )
}

UserLogin.propTypes = {
  setUser: PropTypes.func,
  setAvatar: PropTypes.func
}
