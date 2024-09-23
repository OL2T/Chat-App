import { useState } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

function getSequentialTimestamp(startTime, stepInMinutes) {
  const nextTime = new Date(startTime.getTime() + stepInMinutes * 60 * 1000)
  return nextTime
}

//Create time 1 week ago
let baseTime = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
let baseId = 1

const data = [
  {
    mId: baseId++,
    message: 'Hello',
    timestamp: baseTime.toLocaleTimeString([], { timeStyle: 'short' }),
    senderId: 1,
    receiverId: 2
  },

  {
    mId: baseId++,
    message: 'How are you?',
    timestamp: (baseTime = getSequentialTimestamp(
      baseTime,
      2
    )).toLocaleTimeString([], { timeStyle: 'short' }),
    senderId: 2,
    receiverId: 1
  },

  {
    mId: baseId++,
    message: 'Good!',
    timestamp: (baseTime = getSequentialTimestamp(
      baseTime,
      3
    )).toLocaleTimeString([], { timeStyle: 'short' }),
    senderId: 1,
    receiverId: 2
  },

  {
    mId: baseId++,
    message: 'Hey Victor, long time no see!',
    timestamp: (baseTime = getSequentialTimestamp(
      baseTime,
      5
    )).toLocaleTimeString([], { timeStyle: 'short' }),
    senderId: 1,
    receiverId: 3
  },

  {
    mId: baseId++,
    message: 'Hey Hurin! What’s up?',
    timestamp: (baseTime = getSequentialTimestamp(
      baseTime,
      4
    )).toLocaleTimeString([], { timeStyle: 'short' }),
    senderId: 3,
    receiverId: 1
  },

  {
    mId: baseId++,
    message: 'Just working on a new project.',
    timestamp: (baseTime = getSequentialTimestamp(
      baseTime,
      6
    )).toLocaleTimeString([], { timeStyle: 'short' }),
    senderId: 1,
    receiverId: 3
  },

  {
    mId: baseId++,
    message: 'Need any help?',
    timestamp: (baseTime = getSequentialTimestamp(
      baseTime,
      2
    )).toLocaleTimeString([], { timeStyle: 'short' }),
    senderId: 3,
    receiverId: 1
  },

  {
    mId: baseId++,
    message: 'Yes, that’d be great!',
    timestamp: (baseTime = getSequentialTimestamp(
      baseTime,
      3
    )).toLocaleTimeString([], { timeStyle: 'short' }),
    senderId: 1,
    receiverId: 3
  },

  {
    mId: baseId++,
    message: 'Hey Jony, can you check the new designs?',
    timestamp: (baseTime = getSequentialTimestamp(
      baseTime,
      5
    )).toLocaleTimeString([], { timeStyle: 'short' }),
    senderId: 5,
    receiverId: 4
  },

  {
    mId: baseId++,
    message: 'Sure! Send them over.',
    timestamp: (baseTime = getSequentialTimestamp(
      baseTime,
      4
    )).toLocaleTimeString([], { timeStyle: 'short' }),
    senderId: 4,
    receiverId: 5
  }
]

const getRandomAvatar = () =>
  `https://picsum.photos/seed/${_.random(1, 1000)}/200/300`

const users = [
  {
    uid: 1,
    name: 'Hurin omar',
    avatar: getRandomAvatar(),
    friends: [2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    uid: 2,
    name: 'Iftikhar Shaikh',
    avatar: getRandomAvatar(),
    friends: [1, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    uid: 3,
    name: 'Victor Erixon',
    avatar: getRandomAvatar(),
    friends: [1, 2, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    uid: 4,
    name: 'Hali',
    avatar: getRandomAvatar(),
    friends: [1, 2, 3, 5, 6, 7, 8, 9, 10]
  },
  {
    uid: 5,
    name: 'Jony Ive',
    avatar: getRandomAvatar(),
    friends: [1, 2, 3, 4, 6, 7, 8, 9, 10]
  },
  {
    uid: 6,
    name: 'Aratu Zakia',
    avatar: getRandomAvatar(),
    friends: [1, 2, 3, 4, 5, 7, 8, 9, 10]
  },
  {
    uid: 7,
    name: 'Sufiya',
    avatar: getRandomAvatar(),
    friends: [1, 2, 3, 4, 5, 6, 8, 9, 10]
  },
  {
    uid: 8,
    name: 'Pablo Stanley',
    avatar: getRandomAvatar(),
    friends: [1, 2, 3, 4, 5, 6, 7, 9, 10]
  },
  {
    uid: 9,
    name: 'Farhan Makrani',
    avatar: getRandomAvatar(),
    friends: [1, 2, 3, 4, 5, 6, 7, 8, 10]
  },
  {
    uid: 10,
    name: 'Abrar',
    avatar: getRandomAvatar(),
    friends: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
]

export default function UserLogin({ setUser, setAvatar }) {
  const [uid, setUid] = useState('')

  const handleUserLogin = () => {
    if (!uid) return
    if (uid < 1) {
      alert('User ID must be greater than 0')
      return
    }
    if (
      localStorage.getItem('data') === null &&
      localStorage.getItem('users') === null
    ) {
      localStorage.setItem('users', JSON.stringify(users))
      localStorage.setItem('data', JSON.stringify(data))
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || []
    if (uid > 10 && !existingUsers.find((user) => user.uid === Number(uid))) {
      const newUser = {
        uid: Number(uid),
        name: `User ${uid}`,
        avatar: getRandomAvatar(),
        friends: existingUsers
          .map((user) => user.uid)
          .filter((newUid) => newUid !== uid)
      }

      existingUsers.push(newUser)

      existingUsers.forEach((user) => {
        if (user.uid !== uid) {
          // console.log(user.uid)
          user.friends.push(Number(uid))
        }
      })

      localStorage.setItem('users', JSON.stringify(existingUsers))
    }

    localStorage.setItem('uid', uid)
    localStorage.setItem('isLoggedIn', 'true')
    setUser(uid)
    setAvatar(localStorage.getItem('avatar'))
  }

  return (
    <div className='bg-white absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] min-w-[480px] m-auto p-4 rounded-md shadow-md'>
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
              type='number'
              id='userId'
              required
              onChange={(e) => setUid(e.target.value)}
              placeholder='Enter user ID from 1...'
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
