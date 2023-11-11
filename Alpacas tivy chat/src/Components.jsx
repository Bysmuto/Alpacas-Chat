import { useState } from 'react';
import logo from './assets/logo2.png';

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
  function send(e) {
    sendMessage();
    e.target.value = '';
    setNewText('');
    setNewImg('');
  }

  return (
    <div className='pt-3 select-none  absolute inset-x-0 bottom-0 flex  justify-center  bg-main'>
      <div className=' relative w-[80%]'>
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
    <div className='bg-slate-700 max-h-[80vh] overflow-y-auto overflow-x-hidden'>
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
      {img != '' ? (
        <img
          loading='lazy'
          className=' max-w-sm rounded-xl m-2 ml-12'
          onError={(err) => (err.target.style.display = 'none')}
          src={img}
        ></img>
      ) : null}
      <div className='mt-10 text-white '>

        <div className='flex ml-10'>
          {typeof text !='undefined' ? 
          <p className='bg-op rounded-tl-[20px]  rounded-r-[20px] ml-3  p-3 text-lg font-mono font-bold'>
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
          : null}
          
        </div>

        <div className='flex '>
          <div className='bg-white h-10 w-10 rounded-full ml-3'></div>
          <div className=' m-2 select-text text-xs'>{user}</div>
        </div>
      </div>
    </>
  );
}
