import { useRef } from 'react';
import logo from './assets/logo2.png';
import { signInWithGoogle } from './firebase.jsx';

export function Title() {
  return (
    <div className='select-none flex justify-center p-3 text-white font-semibold text-2xl bg-main text-center'>
      <img
        className='w-12 h-12 '
        src={logo}
      />
      <h1> </h1>
    </div>
  );
}

export function InputsArea({ sendMessage, setNewText, setNewImg }) {
  const inp = useRef();

  function send() {
    sendMessage();

    inp.current.value = '';
    setNewText('');
    setNewImg('');
  }

  return (
    <div className='pt-3 select-none  absolute inset-x-0 bottom-0 flex  justify-center  bg-main'>
      <div className=' relative w-[80%]'>
        <input
          ref={inp}
          className=' p-2 w-full rounded-full focus:outline-none  '
          type='text'
          autoFocus
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              send();
            }
          }}
        />
        <button
          className='p-2 absolute right-0 top-0  rounded-r-full  '
          onClick={send}
        >
          ✔
        </button>
        <label
          className='p-2 absolute  top-0  rounded-r-full  '
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
    <div className='bg-slate-700  max-h-[80vh]  min-h-[80vh] overflow-y-auto overflow-x-hidden'>
      {messages?.map((message) => (
        <Post
          key={message[0]}
          id={message[0]}
          user={message[1].user}
          text={message[1].text}
          img={message[1].img}
          userPic={message[1].userPic}
        />
      ))}
    </div>
  );
}

function Post({ user, text, img, userPic, id }) {
  const words = text?.split(' ');

  return (
    <>
      <div className=' text-white mt-6 '>
        {img != '' ? (
          <img
            loading='lazy'
            className='  max-w-sm rounded-xl m-2 ml-12 max-sm:max-w-[80vw]'
            onError={(err) => (err.target.style.display = 'none')}
            src={img}
          ></img>
        ) : null}

        <div className='flex ml-10 '>
          {text != '' ? (
            <p className='bg-op rounded-tl-[20px]  rounded-r-[20px] ml-3  p-3 text-lg font-mono break-words max-w-[80vw]'>
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
          ) : null}
        </div>

        <div className='flex '>
          <img
            src={userPic}
            className=' h-10 w-10 rounded-full ml-3'
          />
          <div className=' m-2 select-text text-xs'>{user}</div>
        </div>
      </div>
    </>
  );
}

export function LogInPage(google) {
  return (
    <>
      <div className='bg-main min-h-[100vh] flex flex-col justify-center items-center'>
        <h1 className='text-white text-3xl font-mono m-5 '> Alpacas Chat </h1>
        <img
          className='w-40  '
          src={logo}
        />
        <button
          className='bg-white rounded-full p-3 font-bold m-5'
          onClick={signInWithGoogle}
        >
          Entrar com Google
        </button>
      </div>
    </>
  );
}
