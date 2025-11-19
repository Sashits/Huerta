import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBYdKwms_YS97E6BUuSuGdSoRy1dD4lUr4",
    authDomain: "proyectohuertalmms.firebaseapp.com",
    databaseURL: "https://proyectohuertalmms-default-rtdb.firebaseio.com",
    projectId: "proyectohuertalmms",
    storageBucket: "proyectohuertalmms.firebasestorage.app",
    messagingSenderId: "940351629789",
    appId: "1:940351629789:web:b26125b82bb54d0c23ee34"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let sueloSpan = document.getElementById("suelo");
let aireSpan = document.getElementById("aire");
let tempSpan = document.getElementById("temperatura");

const refSensores = ref(db, "sensores");

onValue(refSensores, (datos) => {

    let sensor = datos.val();

    let humedadSuelo = sensor.humedadSuelo;
    let humedadAire = sensor.humedadAire;
    let temperatura = sensor.temperatura;

    sueloSpan.textContent = humedadSuelo;
    aireSpan.textContent = humedadAire;
    tempSpan.textContent = temperatura;

    mensajeHumedadSuelo(humedadSuelo);

})

let mensajeSuelo = document.getElementById("mensajeSuelo");

function mensajeHumedadSuelo(hSuelo) {

    mensajeSuelo.classList.remove("mensaje-alerta", "mensaje-bien");

    if (hSuelo < 40) {
        mensajeSuelo.textContent = "¡Tu planta está secándose!";
        mensajeSuelo.classList.add("mensaje-alerta");
    } else {
        mensajeSuelo.textContent = "Tu planta está bien";
        mensajeSuelo.classList.add("mensaje-bien");
    }
}
