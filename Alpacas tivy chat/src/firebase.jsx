import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';

import {
  getDatabase,
  ref,
  push,
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

export async function getMessages(setPosts) {
  onValue(ref(db, 'Posts'), (snap) => {
    let res = snap.val();
    let data = Object.entries(res);

    setPosts(data.reverse());
  });
}

export async function addMessage(user, text, img) {
  let onlyText = text != '' && img === '';
  let onlyImg = text === '' && img != '';
  let both = text != '' && img != '';

  let refDb = ref(db, 'Posts');

  if (onlyText) {
    push(refDb, { user: user, text: text, img: '' });
  } else {
    const storageRef = sRef(storage, `posts/${img?.name + Math.random()}`);

    let req = await uploadBytes(storageRef, img);
    let imgUrl = await getDownloadURL(storageRef);

    if (onlyImg) {
      push(refDb, { user: user, text: '', img: imgUrl });
    } else if (both) {
      push(refDb, { user: user, text: text, img: imgUrl });
    }
  }
}
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    const user = result.user.displayName;
    const email = result.user.email;
    const profilePic = result.user.photoURL;
    console.log(result);
    localStorage.setItem("user", user);
    localStorage.setItem("profilePic", profilePic);
  });
};
