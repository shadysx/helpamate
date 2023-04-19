// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoNRYEkLUH4nOOM9y1jip8s__yn_f6dHw",
  authDomain: "help-a-mate-891db.firebaseapp.com",
  projectId: "help-a-mate-891db",
  storageBucket: "help-a-mate-891db.appspot.com",
  messagingSenderId: "1074550149851",
  appId: "1:1074550149851:web:9274d924364a28638032fe",
  measurementId: "G-RTF9ZS05TJ"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const storageRef = ref(storage)


export async function uploadImageAsync(uri) {
  try {
 // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), "image");
  const result = await uploadBytes(fileRef, blob)  // We're done with the blob, close and release it
  console.log("result", result)
  blob.close();
  
  let downloadURL = await getDownloadURL(fileRef);
  console.log("result", downloadURL)
  return await getDownloadURL(fileRef)

  }
  catch (error){
    console.log("Error in upload", error)
  }
 }