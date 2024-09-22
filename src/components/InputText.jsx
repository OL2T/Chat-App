import { useState } from 'react'
import PropTypes from 'prop-types'

function InputText({ handleSendMessage }) {
  const [message, setMessage] = useState('')
  const sendMessage = () => {
    handleSendMessage({ message })
    setMessage('')
  }

  return (
    <div>
      <div className='input-area flex bg-white p-2 rounded-sm shadow-md'>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type a message...'
          className='bg-transparent w-full flex-1 border-none outline-none'
        />
        <button className='' onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  )
}

InputText.propTypes = {
  handleSendMessage: PropTypes.func.isRequired
}
export default InputText
