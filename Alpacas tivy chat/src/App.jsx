import { useEffect, useState } from 'react';
import { getMessages, addMessage, signInWithGoogle } from './firebase.jsx';
import { InputsArea, MessagesArea, Title, LogInPage } from './Components.jsx';

function App() {
  // console.clear();

  const [messages, setMessages] = useState();

  const [user, setUser] = useState(localStorage.getItem('user'));
  const [newText, setNewText] = useState(null);
  const [newImg, setNewImg] = useState(null);

  useEffect(() => {
    getMessages(setMessages);
  }, []);

  return (
    <>
      {user != null ? (
        <>
          <Title />

          <MessagesArea messages={messages} />

          <InputsArea
            setNewText={setNewText}
            setNewImg={setNewImg}
            sendMessage={() => addMessage(user, newText, newImg)}
          />
        </>
      ) : (
        <LogInPage  />
      )}
    </>
  );
}

export default App;
