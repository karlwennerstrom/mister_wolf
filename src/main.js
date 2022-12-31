import { createApp } from 'vue'
import App from './App.vue'
import router from './router'



import './assets/main.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMVWuFUsOXcMZo9CHTMG4-wkh-SbVcVJo",
  authDomain: "qr-code-chile.firebaseapp.com",
  projectId: "qr-code-chile",
  storageBucket: "qr-code-chile.appspot.com",
  messagingSenderId: "218963208913",
  appId: "1:218963208913:web:72f632c59f181bf17bf3f0",
  measurementId: "G-461F75EYYT"
};

// Initialize Firebase
const aplicacion_firebase=initializeApp(firebaseConfig);
const analytics = getAnalytics(aplicacion_firebase);

const app = createApp(App)

app.use(router)
app.mount('#app')

app.config.errorHandler = (err) => {
    /* handle error */
    console.log(err)
}
//obtener todos los usuarios de firestore 



//cargar datos desde base de datos mysql de la carpeta database
import "bootstrap/dist/js/bootstrap.js"
