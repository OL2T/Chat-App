import { useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import '../styles/Chat.scss'
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

  // console.log(selectedUserId)
  // console.log(friends)

  const handleSentMessage = ({ message }) => {
    if (!message.trim()) return // Kiểm tra nếu tin nhắn rỗng

    const newMessage = {
      mId: Math.random(),
      message,
      senderId: currentUser.uid,
      receiverId: selectedUserId
    }
    const newMessages = [...messages, newMessage]
    setMessages(newMessages)
    const newData = [...data, newMessage]
    setData(newData)
    localStorage.setItem('data', JSON.stringify(newData))

    setMessage('') // Reset lại message sau khi gửi
  }
  return (
    <div className='h-full flex flex-col'>
      <div className='text-2xl font-semibold text-title mb-[30px]'>Chat</div>
      <div className='flex flex-1 gap-x-8'>
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
            <div className=''>
              {friends.map((friend) => (
                <div
                  onClick={() => setSelectedUserId(friend.uid)}
                  key={friend.uid}
                  className='flex gap-2 p-3 bg-white mb-4 shadow-sm rounded-md hover:cursor-pointer'
                >
                  <div className='avatar'>
                    <img
                      src={friend.avatar}
                      alt={friend.avatar}
                      className='rounded-full w-9 h-9'
                    />
                  </div>
                  <div className='text-sm font-medium'>{friend.name}</div>
                </div>
              ))}
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
                        <small>
                          {new Date().toLocaleTimeString([], {
                            timeStyle: 'short'
                          })}
                        </small>
                      </div>
                      <div className='message bg-[#EAE8ED] text-gray-700 font-semibold text-sm rounded-[18px] px-3 py-2 inline-block  break-all'>
                        <span>{message.message}</span>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div
                      key={message.mId}
                      className='flex items-start gap-2 justify-end mb-3'
                    >
                      <div className='message bg-[#2C8BF2] text-white font-semibold text-sm rounded-[18px] px-3 py-2 inline-block break-all'>
                        <span>{message.message}</span>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
            <div className='input-area flex bg-white p-2 rounded-sm shadow-md'>
              <input
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Type a message...'
                className='bg-transparent w-full flex-1 border-none outline-none'
              />
              <button
                className=''
                onClick={() => handleSentMessage({ message })}
              >
                Send
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
