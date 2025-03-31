// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-next-inz.firebaseapp.com",
  projectId: "insta-next-inz",
  storageBucket: "insta-next-inz.firebasestorage.app",
  messagingSenderId: "755538336338",
  appId: "1:755538336338:web:56e69169b16c3870d19d8b",
  measurementId: "G-FY6E4S09LM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read;
//         allow write: if
//         request.resource.size < 2 * 1024 * 1024 &&
//         request.resource.contentType.matches('image/.*')
//       }
//     }
//   }