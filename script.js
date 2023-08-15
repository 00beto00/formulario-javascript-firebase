
const firebaseConfig = {
    apiKey: "AIzaSyD-pKDCWSTTZXiBButD5ndQewy7wgAoamg",
    authDomain: "datos-de-formulario-1fd3b.firebaseapp.com",
    projectId: "datos-de-formulario-1fd3b",
    storageBucket: "datos-de-formulario-1fd3b.appspot.com",
    messagingSenderId: "378239782174",
    appId: "1:378239782174:web:d7e40793617e656f5e4d0f",
    measurementId: "G-7MK768WYT0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();



document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault() // Detener la actualizacion de la pagina web

    // Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introduce tu nombre'
        errorNombre.classList.add('error-message')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    // Validadar correo electronico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico

    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introduce un correo valido'
        emailError.classList.add('error-message')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    // Validar la conrtraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/;
    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener 8 caracteres, números, mayúsculas y minúsculas, caracteres especiales'
        contrasenaError.classList.add('error-message')
    } else {
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    // Si todos los campos son validos enviar formulario
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
        // BACKEND QUE RECIBA LA INFORMACION
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con exito', docRef.id)
            document.getElementById('formulario').reset()
            
        })
        .catch((error) => {
            alert(error)
        });


       
    }

})