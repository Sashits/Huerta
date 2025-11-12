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
    //Esta información corresponde a mi cuenta de firebase
    //Cada proyecto tiene su propia configuración única
    //Reemplazá los valores por los de tu propio proyecto de Firebase si estás siguiendo este ejemplo
    apiKey: "INGRESA TU API KEY",
    authDomain: "INGRESA TU AUTH DOMAIN",
    databaseURL: "INGRESA TU DATABASE URL",
    projectId: "INGRESA TU PROJECT ID",
    storageBucket: "INGRESA TU STORAGE BUCKET",
    messagingSenderId: "INGRESA TU MESSAGING SENDER ID",
    appId: "INGRESA TU APP ID"
};

// Inicializamos la app de firebase
const app = initializeApp(firebaseConfig);
//Inicializamos la base de datos
const db = getDatabase(app);

//Referenciamos el elemento del DOM donde mostraremos la lista de tareas
let tabla = document.querySelector(".tabla-estudiantes");

// 🔹 Creamos una referencia a la rama "estudiantes"
const refEstudiantes = ref(db, "estudiantes");

// 🔹 Escuchamos los cambios en tiempo real en la rama "estudiantes
// La función onValue se ejecuta cada vez que hay un cambio en los datos de la referencia especificada
onValue(refEstudiantes, (datos) => {
    console.log(datos)
    //Obtenemos la información de los estudiantes
    let estudiantes = datos.val();
    //Limpiamos la lista antes de actualizarla
    tabla.innerHTML = "";
    //Recorremos los datos obtenidos de los estudiantes
    for (let dni in estudiantes) {
        tabla.innerHTML += `
        <tr>
            <td>${dni}</td>
            <td>${estudiantes[dni].apellido}</td>
            <td>${estudiantes[dni].nombre}</td>
            <td>${estudiantes[dni].edad}</td>
        </tr>
        `;
        
    }

})