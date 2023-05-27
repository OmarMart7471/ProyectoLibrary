// Obtener una referencia al botón de ingresar mediante su ID
const botonIngresar = document.getElementById("ingresar");


// Agregar un evento de clic al botón de ingresar
botonIngresar.addEventListener("click", function () {
  // Obtener el valor del campo de nombre de usuario
  const nombreUsuario = document.getElementById("userName").value;

  // Mostrar un mensaje emergente en el navegador con el nombre del usuario
  alert("¡Bienvenido, " + nombreUsuario + "!");

  // Obtener la URL base actual
  const urlActual = window.location.href;
  const urlBase = urlActual.substring(0, urlActual.lastIndexOf("/") + 1);

  // Concatenar la URL base con el nombre del archivo de la página deseada
  const rutaLocal = "main.html";
  const enlaceLocal = urlBase + rutaLocal;

  // Redirigir a la página local
  window.location.href = enlaceLocal;
});


// Obtener una referencia al botón de registrar mediante su ID
const botonRegistrar = document.getElementById("registrar");

// Agregar un evento de clic al botón de registrar
botonRegistrar.addEventListener("click", function() {
// Obtener la URL base actual
const urlActual = window.location.href;
const urlBase = urlActual.substring(0, urlActual.lastIndexOf("/") + 1);

// Concatenar la URL base con la ruta de la página de registro
const rutaRegistro = "RegistroU.html";
const enlaceRegistro = urlBase + rutaRegistro;

// Redirigir a la página de registro
window.location.href = enlaceRegistro;
});
