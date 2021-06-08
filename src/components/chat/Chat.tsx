import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { strTime } from '@utils/index'
import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import './Chat.scss'


const Msg: FC<{ message: Message, self?: boolean }> = ({ message, self }) => {

  return <div className={`msg ${self ? 'self' : ''}`}>
    <div className="sender">{message.sender.username}</div>
    <div className="body">{message.body}</div>
    <div className="time">{strTime(message.sent_at)}</div>
  </div>
}

export const Chat: FC = () => {
  const [messages, setMessages] = useState<ClassMessage[]>([])
  useEffect(() => {
    const link = `http://${location.hostname}:5000`

    axios.get<ClassMessage[]>(link)
      .then(res => setMessages(res.data))
      .catch(console.log)
  }, [])


  return <div className="chat">
    <div className="messages">
      {
        messages.map((v, i) => <Msg key={i} message={v.msg} self={v.msg.sender.username === 'Vishnu Gaud'} />)
      }
    </div>
    <div className="write">
      <form action="#">

          <a href="#" className="write-link attach"></a>
          <input type="text" />
          <a href="#" className="write-link smiley"></a>
          <a href="#" className="write-link send"></a>
      </form>
    </div>
  </div>
}