import logo from './assets/logo.png';

export function Title() {
  return (
    <div
      className=' flex p-3 text-white font-semibold text-2xl bg-main'
    >
      <img
        className='w-12 h-12 '
        src={logo}
        srcset=''
      />
      Alpacas Chat
    </div>
  );
}

export function InputsArea({ sendMessage, setNewText, setNewImg }) {
  function send(e) {
    sendMessage();
    e.target.value = '';
    setNewText('');
    setNewImg('');
  }

  return (
    <div 
    // style={{paddingBottom:"100px"}}
    className='pt-3   absolute inset-x-0 bottom-0 flex  justify-center  bg-main'>
      <div 
      className=' relative w-[80%]'>
        <input
          className=' p-2 w-full rounded-full focus:outline-none  '
          type='text'
          autoFocus
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              send(e);
            }
          }}
        />
        <label
          className='p-2 absolute right-0 top-0  rounded-r-full  '
          htmlFor='selectFile'
        >
          📂
        </label>
        <input
          className='h-0 invisible'
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
          id='selectFile'
          accept='.jpg, .jpeg, .png'
        />
      </div>
    </div>
  );
}

export function MessagesArea({ messages }) {
  return (
    <div
      style={{ maxHeight: '80vh', overflowY: 'scroll',     '&::-webkit-scrollbar': {
        width: '200px'
      },}}
      className='bg-slate-700'
    >
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
    <>
      <div className='mt-5 text-white flex'>
        <div className='h-10 w-10 bg-white rounded-full m-2'></div>
        <p className='bg-op rounded-l-[20px] rounded-r-[20px]  p-5 text-xl font-mono'>
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
      </div>
      {img != '' ? (
        <img
          className='max-w-sm rounded-xl m-2 ml-12'
          onError={(err) => (err.target.style.display = 'none')}
          src={img}
        ></img>
      ) : null}
    </>
  );
}
