import { useEffect, useState } from 'react';
import { getMessages, addMessage } from './firebase.jsx';
import { InputsArea, MessagesArea, Title } from './Components.jsx';

function App() {
  // console.clear();

  const [messages, setMessages] = useState();
  const [user, setUser] = useState('');

  const [newText, setNewText] = useState('');
  const [newImg, setNewImg] = useState('');

  useEffect(() => {
    getMessages(setMessages);
  }, []);


  return (
    <div className='overflow-x-hidden'>
      <Title />

      <MessagesArea messages={messages} />

      <InputsArea
        setNewText={setNewText}
        setNewImg={setNewImg}
        sendMessage={() => addMessage(user, newText, newImg)}
      />
    </div>
  );
}

export default App;
