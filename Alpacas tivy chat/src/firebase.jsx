import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';

import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
} from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';

import {
  getStorage,
  getDownloadURL,
  ref as sRef,
  uploadBytes,
} from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
} from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyD2DdUnvQvxRUrCT7qbLfh88-QJl_kSBVQ',
  authDomain: 'alpacas-tivy-chat.firebaseapp.com',
  databaseURL: 'https://alpacas-tivy-chat-default-rtdb.firebaseio.com',
  projectId: 'alpacas-tivy-chat',
  storageBucket: 'alpacas-tivy-chat.appspot.com',
  messagingSenderId: '534308902051',
  appId: '1:534308902051:web:3cd9801253d3b194d21b16',
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function getMessages(setPosts) {
  onValue(ref(db, 'Messages'), (snap) => {
    let res = snap.val();
    let data = Object.entries(res);

    setPosts(data.reverse());
  });
}

export async function addMessage(user, text, img) {
  let hasImg = img != '';

  let refDb = ref(db, 'Messages');

  let message = {
    user: user,
    text: text,
    userPic: localStorage.getItem('profilePic'),
    uid: localStorage.getItem('uid'),
  };

  if (!hasImg) {
    push(refDb, { ...message });
  } else {
    const storageRef = sRef(storage, `posts/${img?.name + Math.random()}`);

    let req = await uploadBytes(storageRef, img);
    let imgUrl = await getDownloadURL(storageRef);
    push(refDb, {
      ...message,
      img: imgUrl,
    });
  }
}

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    const user = result.user.displayName;
    const profilePic = result.user.photoURL;
    const uid = result.user.providerData[0].uid;

    localStorage.setItem('user', user);
    localStorage.setItem('uid', uid);
    localStorage.setItem('profilePic', profilePic);

    set(ref(db, 'Users/' + user + '_' + uid), {
      user: user,
      profilePic: profilePic,
      uid: uid,
    });
    window.location.reload();
  });
};
