import { useState } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const users = [
  {
    uid: 1,
    name: 'Hurin omar',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    uid: 2,
    name: 'Iftikhar Shaikh',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [1, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    uid: 3,
    name: 'Victor Erixon',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [1, 2, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    uid: 4,
    name: 'Hali',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [1, 2, 3, 5, 6, 7, 8, 9, 10]
  },
  {
    uid: 5,
    name: 'Jony Ive',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [1, 2, 3, 4, 6, 7, 8, 9, 10]
  },
  {
    uid: 6,
    name: 'Aratu Zakia',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [1, 2, 3, 4, 5, 7, 8, 9, 10]
  },
  {
    uid: 7,
    name: 'Sufiya',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [1, 2, 3, 4, 5, 6, 8, 9, 10]
  },
  {
    uid: 8,
    name: 'Pablo Stanley',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [1, 2, 3, 4, 5, 6, 7, 9, 10]
  },
  {
    uid: 9,
    name: 'Farhan Makrani',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [1, 2, 3, 4, 5, 6, 7, 8, 10]
  },
  {
    uid: 10,
    name: 'Abrar',
    avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`,
    friends: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
]
const data = [
  {
    mId: 1,
    message: 'Hello',
    timestamp: new Date().toLocaleTimeString([], {
      timeStyle: 'short'
    }),
    senderId: 1,
    receiverId: 2
  },
  {
    mId: 2,
    message: 'How are you?',
    timestamp: new Date().toLocaleTimeString([], {
      timeStyle: 'short'
    }),
    senderId: 2,
    receiverId: 1
  },
  {
    mId: 3,
    message: '5',
    timestamp: new Date().toLocaleTimeString([], {
      timeStyle: 'short'
    }),
    senderId: 1,
    receiverId: 2
  },
  {
    mId: 4,
    message: 'Hello',
    timestamp: new Date().toLocaleTimeString([], {
      timeStyle: 'short'
    }),
    senderId: 1,
    receiverId: 2
  },
  {
    mId: 5,
    message: 'This is message 1 -> 5',
    timestamp: new Date().toLocaleTimeString([], {
      timeStyle: 'short'
    }),
    senderId: 1,
    receiverId: 5
  },
  {
    mId: 6,
    message: 'This is message 5 -> 1',
    timestamp: new Date().toLocaleTimeString([], {
      timeStyle: 'short'
    }),
    senderId: 5,
    receiverId: 1
  },
  {
    mId: 7,
    message: 'Hello',
    timestamp: new Date().toLocaleTimeString([], {
      timeStyle: 'short'
    }),
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
    <div className='bg-white max-w-[480px] m-auto p-4 rounded-md shadow-md'>
      <h1 className='text-3xl font-bold text-center mb-8 text-title'>Login</h1>
      <form onSubmit={handleUserLogin} className=''>
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='mb-4'>
            <label
              htmlFor='userId'
              className='block text-gray-700 font-bold mb-2'
            >
              User ID:
            </label>
            <input
              type='text'
              // name='userId'
              id='userId'
              required
              onChange={(e) => setUid(e.target.value)}
              placeholder='From 1 to 10'
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
