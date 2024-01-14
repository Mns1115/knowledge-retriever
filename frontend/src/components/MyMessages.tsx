import * as React from 'react';
import{useEffect }from 'react'
import Sheet from '@mui/joy/Sheet';

import MessagesPane from './MessagesPane';
import ChatsPane from './ChatsPane';
import { ChatProps } from '../types';
import { chats, users } from '../data';

import axios from "axios";
axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
// axios.defaults.headers.post['sessionid'] = localStorage.getItem('sessionid');
export default function  MyProfile() {
  
  chats[0].messages=[]
  chats[0].messages[0] = {
    id: '1',
    content: 'Hi Olivia, I am currently working on the project.',
    timestamp: 'Wednesday 9:00am',
    sender: 'You',
  }
  let sessionid= localStorage.getItem("sessionid")
  const handleDummy = async () => {
    const headers = {
      'sessionid': String(sessionid),
    };
  const response = await axios.post("http://127.0.0.1:8000/api/gethistory", {

    });
    let mainid=0
    for (let i= 0; i< response.data.length; i++){
      let obj=response.data[i]
      
      console.log(obj)
      chats[0].messages[mainid]={
        id: obj['msgID'],
        content:obj['query'],
        timestamp: obj['time'],
        sender: 'You'
      }
      mainid=mainid+1
      chats[0].messages[mainid]={
        id: obj['msgID'],
        content:obj['msg'],
        timestamp: obj['time'],
        sender: users[0]
      }
      mainid=mainid+1;
    }
  }
  // useEffect(() => {
  handleDummy()
  // },[])
  const [selectedChat, setSelectedChat] = React.useState<ChatProps>(chats[0]);
  return (
    <Sheet
      sx={{
        flex: 1,
        width: '100%',
        mx: 'auto',
        pt: { xs: 'var(--Header-height)', sm: 0 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(min-content, max(100%, 400px)) 1fr',
        },
      }}
    >
      {/* <Sheet
        sx={{
          position: { xs: 'fixed', sm: 'sticky' },
          transform: {
            xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 100,
          width: '100%',
          top: 52,
        }}
      >
        <ChatsPane
          chats={chats}
          selectedChatId={selectedChat.id}
          setSelectedChat={setSelectedChat}
        />
      </Sheet> */}
      <MessagesPane chat={selectedChat} />
    </Sheet>
  );
}
