// Obtener una referencia al botón de ingresar mediante su ID
const botonIngresar = document.getElementById("ingresar");

// Agregar un evento de clic al botón de ingresar
botonIngresar.addEventListener("click", function () {
  // Obtener el valor del campo de nombre de usuario y contraseña
  const nombreUsuario = document.getElementById("userName").value;
  const password = document.getElementById("password").value;

  // Buscar el usuario en el array de usuarios registrados
  const usuarioEncontrado = usuariosRegistrados.find(function(usuario) {
    return usuario.userName === nombreUsuario && usuario.password === password;
  });

  // Verificar si se encontró el usuario
  if (usuarioEncontrado) {
    alert("¡Bienvenido, " + usuarioEncontrado.fullName + "!");
    // Redirigir a la página principal después del inicio de sesión exitoso
    window.location.href = "main.html";
  } else {
    alert("Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
  }
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


