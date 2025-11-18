//Importamos los modulos necesarios de firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
//Modulos de la base de datos: Cada uno de estos modulos nos permite realizar diferentes operaciones en la base de datos
//Por ejemplo, "getDatabase" nos permite obtener una instancia de la base de datos, 
// "ref" nos permite crear referencias a ubicaciones específicas en la base de datos,
// "onValue" nos permite escuchar cambios en los datos en tiempo real, y 
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";


//Importamos esta configuracion desde firebase
//En la configuración del proyecto, elegimos la opción CDN 
// y copiamos el fragmento de código que nos proporciona Firebase, sin las etiquetas <script>.
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYdKwms_YS97E6BUuSuGdSoRy1dD4lUr4",
    authDomain: "proyectohuertalmms.firebaseapp.com",
    databaseURL: "https://proyectohuertalmms-default-rtdb.firebaseio.com",
    projectId: "proyectohuertalmms",
    storageBucket: "proyectohuertalmms.firebasestorage.app",
    messagingSenderId: "940351629789",
    appId: "1:940351629789:web:b26125b82bb54d0c23ee34"
  };

// Inicializamos la app de firebase
const app = initializeApp(firebaseConfig);
//Inicializamos la base de datos
const db = getDatabase(app);

//Referenciamos el elemento del DOM donde mostraremos la lista de tareas
let tabla = document.querySelector(".tabla-huerta");

// 🔹 Creamos una referencia a la rama "estudiantes"
const refHuerta = ref(db, "huerta");

// 🔹 Escuchamos los cambios en tiempo real en la rama "estudiantes
// La función onValue se ejecuta cada vez que hay un cambio en los datos de la referencia especificada
onValue(refHuerta, (datos) => {
    console.log(datos)
    //Obtenemos la información de los estudiantes
    let DatosHuerta = datos.val();
    //Limpiamos la lista antes de actualizarla
    tabla.innerHTML = "";
    //Recorremos los datos obtenidos de los estudiantes
    for (let dni in DatosHuerta) {
        tabla.innerHTML += `
        <tr>
            <td>${dni}</td>
            <td>${DatosHuerta[dni].apellido}</td>
            <td>${DatosHuerta[dni].nombre}</td>
        </tr>
        `;
        
    }

})