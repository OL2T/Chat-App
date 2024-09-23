import { useEffect, useRef, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { LuSend } from 'react-icons/lu'
import { LiaSmileBeamSolid } from 'react-icons/lia'
import { RiAttachment2 } from 'react-icons/ri'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoMdArrowDropdown } from 'react-icons/io'
import '../Chat.scss'
import ChatBox from '../components/ChatBox'
import InputText from '../components/InputText'

export default function Chat() {
  const [data, setData] = useState([])
  const [users, setUsers] = useState([])

  const [message, setMessage] = useState('')

  const [messages, setMessages] = useState([])

  const [selectedUserId, setSelectedUserId] = useState(null)
  const [currentUser, setCurrentUser] = useState({
    uid: 1,
    name: 'Tai',
    avatar: ''
  })
  const [friends, setFriends] = useState([])

  const messageEndRef = useRef(null)

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem('data'))
    // console.log(storeData)
    setData(storeData)
  }, [])

  useEffect(() => {
    const storeUsers = JSON.parse(localStorage.getItem('users'))
    setUsers(storeUsers)
  }, [])

  useEffect(() => {
    if (selectedUserId === null) {
      return setMessages([])
    }

    const filteredMessage = data?.filter((message) => {
      return (
        (message.senderId === selectedUserId &&
          message.receiverId === currentUser.uid) ||
        (message.senderId === currentUser.uid &&
          message.receiverId === selectedUserId)
      )
    })
    // console.log(filteredMessage)
    setMessages(filteredMessage)
  }, [currentUser, selectedUserId, data])

  useEffect(() => {
    const uid = localStorage.getItem('uid') || ''
    if (uid) {
      const user = users.find((user) => user.uid === Number(uid))
      setCurrentUser(user)
    }
  }, [users])

  useEffect(() => {
    if (currentUser?.friends?.length > 0) {
      const friendIds = currentUser.friends
      // console.log(friendIds)
      const friends = users.filter((user) => friendIds.includes(user.uid))
      setFriends(friends)
    }
  }, [currentUser, users])

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const getLatestMessage = (friendId) => {
    const latestMessage = data
      .filter((message) => {
        return (
          (message.senderId === friendId &&
            message.receiverId === currentUser.uid) ||
          (message.senderId === currentUser.uid &&
            message.receiverId === friendId)
        )
      })
      .sort((a, b) => b.mId - a.mId)[0]
    // console.log(latestMessage)
    return latestMessage
  }

  const handleSentMessage = ({ message }) => {
    if (!message.trim()) return
    const baseId = data.length + 1
    const newMessage = {
      mId: baseId,
      message,
      timestamp: new Date().toLocaleTimeString([], { timeStyle: 'short' }),
      senderId: currentUser.uid,
      receiverId: selectedUserId
    }
    const newMessages = [...messages, newMessage]
    setMessages(newMessages)
    const newData = [...data, newMessage]
    setData(newData)
    localStorage.setItem('data', JSON.stringify(newData))

    setMessage('')
  }
  return (
    <div className='h-full flex flex-col'>
      <div className='flex items-center justify-end gap-8'>
        <div className='flex items-center text-gray-600 text-sm'>
          Status: Sale{' '}
          <span className='text-[#AEB5C6]'>
            <IoMdArrowDropdown />
          </span>
        </div>
        <div className='text-[#AEB5C6] font-semibold'>
          <IoMdNotificationsOutline className='stroke-[2px] w-5 h-5' />
        </div>
      </div>
      <div className='text-2xl font-medium text-title mb-[30px]'>Chat</div>
      <div className='flex flex-1 gap-x-6'>
        <div className='flex-[30%]'>
          <div>
            <div className='flex relative items-center border-b px-4 py-3 border-[#DEDFEB] mb-8 '>
              <label
                htmlFor='search'
                className='absolute left-0 top-[15px]  text-gray-400 hover:cursor-pointer'
              >
                <IoIosSearch className='stroke-[5px] w-[20px] h-[20px]' />
              </label>
              <input
                type='text'
                id='search'
                placeholder='Search'
                className='border-none outline-none bg-transparent w-full placeholder:text-[12px] placeholder:text-gray-400 font-medium pl-3'
              />
            </div>
            <div className='friend-list max-h-[450px] overflow-y-scroll overflow-x-hidden'>
              {friends.map((friend) => {
                const latestMessage = getLatestMessage(friend.uid)
                if (friend.uid === currentUser.uid) return null
                return (
                  <div
                    onClick={() => setSelectedUserId(friend.uid)}
                    key={friend.uid}
                    className={`flex gap-2 p-3 mb-4 rounded-md hover:cursor-pointer last:mb-0 ${selectedUserId === friend.uid ? 'bg-gray-50 shadow-lg' : 'bg-white shadow-sm'}`}
                  >
                    <div className='avatar'>
                      <img
                        src={friend.avatar}
                        alt={friend.avatar}
                        className='rounded-full w-11 h-11'
                      />
                    </div>
                    <div>
                      <div className='text-sm font-medium'>{friend.name}</div>
                      <div className='limit-text text-[12px] text-gray-400'>
                        {latestMessage?.message || 'No messages yet'}{' '}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className='flex flex-col w-full h-full flex-[70%]'>
          <div className='header-chat h-[49px] border-b border-[#DEDFEB] mb-8 '>
            <div className='font-semibold text-title'>Gold Coast</div>
            <div className='font-semibold text-gray-400 text-[12px]'>
              From :{' '}
              <span>
                {friends.find((friend) => friend.uid === selectedUserId)?.name}
              </span>
            </div>
          </div>
          <div className='chat-container flex flex-col flex-1 justify-between'>
            <div className='message-list flex-1 max-h-[400px] h-full overflow-y-scroll max-w-full'>
              {messages.map((message) => {
                if (message.receiverId === currentUser.uid) {
                  return (
                    <div
                      key={message.mId}
                      ref={messageEndRef}
                      className='flex items-start gap-2 justify-start mb-3'
                    >
                      <div className='group'>
                        <div className='avatar bg-gray-200 w-9 h-9 rounded-full'>
                          <img
                            src={
                              friends.find(
                                (friend) => friend.uid === message.senderId
                              )?.avatar
                            }
                            alt={
                              friends.find(
                                (friend) => friend.uid === message.senderId
                              )?.avatar
                            }
                            className=' bg-gray-200 w-9 h-9 rounded-full'
                          />
                        </div>
                        <small>{message.timestamp} </small>
                      </div>
                      <div className='message bg-[#EAE8ED] text-gray-700 font-medium text-sm rounded-[18px] px-3 py-2 inline-block  break-all'>
                        <span>{message.message}</span>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div
                      key={message.mId}
                      ref={messageEndRef}
                      className='flex items-start gap-2 justify-end mb-3'
                    >
                      <div className='message bg-[#2C8BF2] text-white font-medium text-sm rounded-[18px] px-3 py-2 inline-block break-all'>
                        <span>{message.message}</span>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
            <div className='input-area relative flex bg-white px-4 py-2 items-center rounded-b-[4px] shadow-md'>
              <div className=' text-[#AEB5C6]'>
                <LiaSmileBeamSolid className='w-7 h-7' />
              </div>
              <input
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSentMessage({ message })
                  }
                }}
                placeholder='Type a message...'
                className='bg-transparent w-full flex-1 border-none outline-none p-2 placeholder:text-gray-300 placeholder:font-normal placeholder:text-sm text-gray-700 font-normal'
              />
              <div className='text-[#AEB5C6] mr-3'>
                <RiAttachment2 className='w-4 h-4' />
              </div>
              <button
                className='w-10 h-10 bg-gradient-to-b from-blue-300 to-[#2C8BF2] text-white rounded-full flex items-center justify-center hover:bg-[#2C8BF2] hover:text-white shadow-blue-400 shadow-xl'
                onClick={() => handleSentMessage({ message })}
              >
                <LuSend />
              </button>
            </div>
          </div>
          {/* <ChatBox messages={messages} />
          <InputText handleSendMessage={handleSendMessage} /> */}
        </div>
      </div>
    </div>
  )
}
