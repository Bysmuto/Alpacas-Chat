export function Title() {
  return (
    <div className='p-3 text-white text-2xl text-center bg-main'>
      Alpacas Chat
    </div>
  );
}

export function InputsArea({ sendMessage, setNewText, setNewImg }) {
  function send(e) {
    sendMessage();
    e.target.value = '';
    setNewText('');
    setNewImg('')
  }

  return (
    <div
      className='
    absolute inset-x-0 bottom-0  
    flex justify-center 
    p-3 bg-main'
    >
      <input
        type='text'
        autoFocus
        className=' m-1 p-2 rounded-full w-2/5 '
        onChange={(e) => setNewText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            send(e);
          }
        }}
      />
      <label
        className=' m-1 p-2 rounded-full  '
        htmlFor='selectFile'
      >
        📂
      </label>
      <input
        type='file'
        onChange={(e) => {
          if (e.target.files[0].size < 1050974) {
            setNewImg(e.target.files[0]);
          } else {
            alert(
              ' Maximo de 1MB\n Olha o tamanho disso ta querendo fude a database?? \n'
            );
          }
        }}
        style={{ display: 'none' }}
        id='selectFile'
        accept='.jpg, .jpeg, .png'
      />
    </div>
  );
}

export function MessagesArea({ messages }) {
  return (
    <div style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
      {messages?.map((message) => (
        <Post
          key={message[0]}
          user={message[1].user}
          text={message[1].text}
          img={message[1].img}
        />
      ))}
    </div>
  );
}

function Post({ user, text, img }) {
  const words = text?.split(' ');

  return (
    <div className='mt-5  '>
      <p className='text-3xl font-mono'>
        {words?.map((word) => {
          const URL_REGEX =
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
          return word.match(URL_REGEX) ? (
            <>
              <a
                href={word}
                target='_blank'
              >
                {' '}
                <u>{new URL(word).hostname}</u>{' '}
              </a>{' '}
            </>
          ) : (
            word + ' '
          );
        })}
      </p>

      {img != '' ? (
        <img 
          onError={(err) => (err.target.style.display = 'none')}
          className='max-w-sm rounded-xl'
          src={img}
        ></img>
      ) : null}
    </div>
  );
}
