$(document).ready(function () {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyAgWbcTFig7NV-5Ukph3s3I5Kx7QizAbj8",
      authDomain: "hyunjin-ec7dc.firebaseapp.com",
      databaseURL: "https://hyunjin-ec7dc-default-rtdb.firebaseio.com",
      projectId: "hyunjin-ec7dc",
      storageBucket: "hyunjin-ec7dc.appspot.com",
      messagingSenderId: "201354300050",
      appId: "1:201354300050:web:fd1da3f5fb892ba657f44b",
      measurementId: "G-7EF17E2TXL"
    };
    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
  
    // Inicializar Auth de Firebase
    const auth = firebase.auth();
  
    // Inicializar Auth de Google
    var provider = new firebase.auth.GoogleAuthProvider();
  
    // Inicializar Firestore (Base de datos)
    const db = firebase.firestore();
  

    // Rergistrar los usuarios

      // Si se completa el formulario de registro y se envia, registra al nuevo usuario y se guarda la sesion
    $("#btnRegistrar").click(function (e) {
        e.preventDefault();
        // Capturamos los datos enviados por el formulario de registro
        //Campo Nombre Completo
        var nombre = $("#nombreCompleto").val();
        // Campo email
        var email = $("#registroEmail").val();
        // Campo Usuario
        var usuario = $("#usuarioNickname").val();
        //Campo Password
        var password = $("#registroPassword").val();

        // Metodo que permite ingreso de usarios con email
      auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          // limpiar formualrio de ingreso
          $("#IngresoEmail").trigger("reset");
        })
        .catch((error) => {// Esto permite capturar el error, se puede trabajar este catch con los codigos de error
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    })
    // Acceso de usuarios
    // Ingresar por email
    $("#btnIngresoEmail").click(function (e) {
      e.preventDefault();
      // Mostramos formulario de ingreso por email
      $("#IngresoEmail").show();
      // Ocultamos boton de ingreso por email
      $("#btnIngresoEmail").hide();
    })
    // Si ingresamos por correo y password mostramos formulario de ingreso 
    $("#btnIngresoConEmail").click(function (e) {
      e.preventDefault();
      // Capturamos los datos enviados por el formulario de ingreso
      // Campo email
      var email = $("#ingresoEmail").val();
      // Campo Password
      var password = $("#ingresoPassword").val();
  
      // Metodo que permite ingreso de usarios con email
      auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          // limpiar formualrio de ingreso
          $("#IngresoEmail").trigger("reset");
        })
        .catch((error) => {// Esto permite capturar el error, se puede trabajar este catch con los codigos de error
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    })
    

    // Ingresar con google
    $("#btnIngresoGmail").click(function (e) {
        e.preventDefault();
        auth.signInWithPopup(provider)
          .then(result => {
            console.log("Ingreso con Google");
          })
          .catch(err => {
            console.log(err);
          })
      })
      
      // Desconexion de Usuarios
    // Boton LogOut
    $("#logout").click(function (e) {
      e.preventDefault();
      auth.signOut().then(() => {
        console.log("Log Out");
      })
    })

    // Ver si sesion esta activa
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Si usuario esta conectado
        // ocultamos el login
        $("#login").hide();
        // ocultamos el formulario de registro
        $(".registro-usuario").hide();
        // mostramos el contenido
        $("#contenidoWeb").show();
        obtienePaises();
      } else {
        // Si usuario esta desconectado
        // Se oculta formulario de registro
        $(".registro-usuario").hide();
        // Se oculta formulario de ingreso
        $("#IngresoEmail").hide();
        // Se muestra el boton de ingreso por email
        $("#btnIngresoEmail").show();
        // Se oculta contenido de la página
        $("#contenidoWeb").hide();
        // Se muestra el login
        $("#login").show()
      }
    });






      /*


