let booksResult = []
let carrito = []
let pedido = []
let pedidoProcesado = []

const mainBlock = document.querySelector("#bookList")
const radioButtons = document.getElementsByName("default-radio");
const inputBusqueda = document.getElementById("buscar");
let cart = document.getElementById("cartProducts")
let productList = document.getElementById("cartProductsPrice")
const btnConfirmarPedido = document.getElementById('confirmarPedido')
let totalCart = document.getElementById("totalPedido")
const cartlist  = document.getElementById("pedidosCompletos")

const API_KEY = "&key=AIzaSyAiOsiDYnrU9fAyn0rmEw9oBLIK9lr-9Wg"

const consultaTitulo = "https://www.googleapis.com/books/v1/volumes?q=+intitle:"
const consultaAutor = "https://www.googleapis.com/books/v1/volumes?q=+inauthor:"
const consultaISBN = "https://www.googleapis.com/books/v1/volumes?q=isbn:"

const generarPrecioAlAzar = () => {
    const min = 20.00;
    const max = 300.00;
    const precio = Math.random() * (max - min) + min;
  return parseFloat(precio.toFixed(2));
  }

const busquedaLibro = (event) => {

    event.preventDefault(); // Evitar el envío del formulario

    clearContent()
    
    let texto = inputBusqueda.value;
    let searchby = obtenerRadioSeleccionado();


    switch (searchby) {
        case 'autor':
          // Lógica para el radio button 'Autor'
          console.log('Seleccionaste Autor tu texto ingresado es = '+texto);
          bookAutor(texto);
          break;
    
        case 'isbn':
          // Lógica para el radio button 'ISBN'
          console.log('Seleccionaste ISBN tu texto ingresado es = '+texto);
          bookISBN(texto);
          break;
    
        case 'titulo':
          // Lógica para el radio button 'Titulo'
          console.log('Seleccionaste Título tu texto ingresado es = '+texto);
          bookTitle(texto);
          break;
    
        default:
          console.log('Ningún radio button seleccionado');
          break;
      }

  };

const pedidoEnviado = (event) =>{
    event.preventDefault();
    if (pedido.length === 0 || totalPedido <= 0) {
        alert("No hay productos en el carrito o el precio total es 0.");
        return;
    }else{
    
      // Crear objeto con los datos del pedido
      const pedidoObjeto = {
        pedido: pedido,
        total: totalPedido
      };
    
      // Agregar el objeto al array de pedidos procesados
      pedidoProcesado.push(pedidoObjeto);
    }
      // Limpiar carrito y pedido actual
      clearCart();
      clearCartContent()
      pedido = [];

      pedidoProcesado.forEach(pedidoTerminado,index => {

        let pedido = pedidoObjeto.pedido;
        let total = pedidoObjeto.total;

        let olList = document.createElement("ol")
        olList.setAttribute("class","pl-5 mt-2 space-y-1 list-inside")
        pedido.forEach((producto) => {
            let titulo = producto.titulo
            let cantidad = producto.cantidad
            let precio = producto.precio

            olList.innerHTML = 
            `
            <li>Titulo: ${titulo}</li>
            <li>Cantidad: ${cantidad}</li>
            <li>Precio: ${precio}</li>
            `
        })
        olList.innerHTML = 
            `
            <ol>Total = $${total} MXN</ol>
            `
        cartlist.appendChild(olList)
    })

}
  
const renderList = (data,input) => {
    let booksList = data.items;
    console.log("List by "+input);
    console.log(booksList);

    let totalPedido = 0;

    booksList.forEach(bookElement => {

           let imagen = bookElement.volumeInfo.imageLinks.thumbnail
           let title = bookElement.volumeInfo.title
           let autor = bookElement.volumeInfo.authors
           let isbn = bookElement.volumeInfo.industryIdentifiers
           let desc = bookElement.volumeInfo.description
           let price = generarPrecioAlAzar()

           let id = bookElement.id

           let divCard = document.createElement("div")
           divCard.setAttribute("class","mb-6 lg:mb-0")
           divCard.setAttribute("id","card-"+id)

           document.querySelector("#bookList").appendChild(divCard)
           

           let card = document.getElementById("card-"+id)

           // Map y join para obtener los valores de identifier
           let identifiers = isbn.map((item) => item.identifier).join(", ");


           card.innerHTML = 
           `
           <div class="relative block bg-white rounded-lg shadow-lg">
          <div class="flex">
            <div
              class="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4 w-full"
              data-mdb-ripple="true" data-mdb-ripple-color="light">
              <img src="${imagen}" class="w-full" />
              <a href="#!">
                <div
                  class="absolute  top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:shadow-xl hover:transform hover:scale-105 duration-300 hover:opacity-100 transition duration-300 ease-in-out"
                  style="background-color: rgba(251, 251, 251, 0.15)"></div>
              </a>
            </div>
          </div>
          <div class="p-6 flex flex-col justify-items-center">
            <h5 class="text-lg self-center font-bold mb-2">${title}</h5>
            <h6 class="font-medium self-center text-blue-600 mb-4">${autor}</h6>
            <h6 class="font-thin self-center text-black mb-6">${identifiers}</h6>

            <span class="rounded-full m-2 px-2 py-3 self-center text-white badge bg-green-400 text-xs">
              $${price}
            </span>

            <div class="overflow-y-auto">

              <p class="text-justify h-14">${desc}</p>

            </div>

            
              <div class="flex flex-col md:flex-row justify-center py-2 items-center text-gray-900">
                <button id="addCart-${id}" class="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-blue-800 hover:text-white border-2 border-gray-900 focus:outline-none">
                  Agregar al carrito</button>
              </div>

          </div>
        </div>
           `
        let addCartButton = document.getElementById(`addCart-${id}`);

        addCartButton.addEventListener("click", () => {

            let isDuplicate = pedido.some((product) => product.titulo === title);

            if (isDuplicate) {
                alert("El producto ya está en el carrito.");
                return;
            }

            // Agregar datos al array "pedido"
            let bookData = {
              image: imagen,
              titulo: title,
              author: autor,
              precio: price,
              cantidad: 1,
              idCart: id
            };
            let precioPorLibro = bookData.cantidad * bookData.precio
            totalPedido += precioPorLibro
            cantidadAnterior = bookData.cantidad 
            pedido.push(bookData);

            
            // Crear un nuevo elemento div para representar la tarjeta del producto
            let productCard = document.createElement("div");
            productCard.className = "flex-shrink-0 m-6 relative overflow-hidden bg-purple-500 rounded-lg max-w-xs shadow-lg";
            cart.appendChild(productCard);

            // Establecer el contenido HTML de la tarjeta del producto
            productCard.innerHTML =
            `
                <button class="delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" id="svg-${bookData.idCart}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 absolute top-0 right-0 m-4 cursor-pointer">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>

                <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style="transform: scale(1.5); opacity: 0.1;">
                  <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white"/>
                  <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white"/>
                </svg>
                <div class="relative pt-10 px-10 flex items-center justify-center">
                  <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style="background: radial-gradient(black, transparent 60%); transform: rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1); opacity: 0.2;"></div>
                  <img class="relative w-40 h-70" src="${bookData.image}" alt="">
                </div>
                <div class="flex flex-col text-white px-6 pb-6 mt-6">
                  <div class="flex justify-between p-2">
                    <span class="block font-semibold text-sm">${bookData.titulo}</span>
                  <div class="block flex items-end border-gray-950">
      
                  <input type="number" class="w-20 h-8 text-black rounded-lg" name="quantity" id="quantity-${bookData.idCart}" min="1" max="10" value="${bookData.cantidad}" style="z-index: 100;">
      
                  </div>
                  </div>
                  <div class="flex justify-between p-2">
                    <span class="block opacity-75 text-sm -mb-1">${autor}</span>
                    <span class="block bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center">$${bookData.precio}</span>
                  </div>
                </div>
            `
            // Obtener el input de cantidad
            let quantityInput = document.querySelector(`#quantity-${bookData.idCart}`);

            let productBook = document.createElement("div")

            productBook.setAttribute("name","Producto_"+bookData.idCart)
            productBook.setAttribute("class","mb-2 my-3 flex justify-between")

            productList.appendChild(productBook)

            productBook.innerHTML = 
            `
                <p class="text-gray-700 text-base">${bookData.titulo} </p>
                <p class="text-gray-700 text-base">$${precioPorLibro}</p>
            `
            
            
            totalCart.innerText = `$${totalPedido} MXN`;

            

            // Agregar evento de cambio al input de cantidad
            quantityInput.addEventListener("change", (event) => {
                // Obtener el nuevo valor del input
                let newQuantity = parseInt(event.target.value);

                // Actualizar el atributo "cantidad" del libro en el array "pedido"
                bookData.cantidad = newQuantity;

                let precioPorLibro = bookData.cantidad * bookData.precio;

                if (newQuantity > cantidadAnterior) {
                    // La cantidad ha aumentado
                    // Sumar el precio del libro actualizado al total del pedido
                    totalPedido += (newQuantity - cantidadAnterior) * bookData.precio;
                } else if (newQuantity < cantidadAnterior) {
                    // La cantidad ha reducido
                    // Restar el precio del libro eliminado al total del pedido
                    totalPedido -= (cantidadAnterior - newQuantity) * bookData.precio;
                }

                // Actualizar la cantidad anterior con la nueva cantidad
                cantidadAnterior = newQuantity;

                // Actualizar el contenido del elemento HTML con id "totalPedido"
                totalCart.innerText = `$${totalPedido} MXN`;

                productBook.innerHTML = `
                    <p class="text-gray-700 text-base">${bookData.titulo} </p>
                    <p class="text-gray-700 text-base">$${precioPorLibro.toFixed(2)}</p>
                `;

                console.log("Cantidad actualizada:", bookData);
            });

            let svgElement = document.querySelector(`#svg-${bookData.idCart}`);

            svgElement.addEventListener("click", () => {
            // Obtener el índice del libro en el array "pedido"
            console.log("Se presiono al svg "+bookData.idCart)
            console.log("Lista actual " +pedido)
            let bookIndex = pedido.findIndex((book) => book.idCart === id);

            if (bookIndex !== -1) {

                totalPedido -= (pedido[bookIndex].cantidad * pedido[bookIndex].precio)

                // Eliminar el libro del array "pedido"
                pedido.splice(bookIndex, 1);

                // Obtener el elemento HTML padre del elemento <svg>
                let parentElement = event.target.parentElement.parentElement;
                let parentElement2 = productBook;
                // Eliminar el elemento padre del HTML
                parentElement.remove();
                parentElement2.remove();

                totalCart.innerText = `$${totalPedido}`

                console.log("Libro eliminado del pedido:", id);
            }
            });

            

            console.log("Libro agregado al carrito:", bookData);
          });
    });
  };
  
  const clearContent = () => {
    mainBlock.innerHTML = "";
  };

  const clearCart = () => {
    cart.innerHTML = ""

  }

  const clearCartContent = () => {
    productList.innerHTML="";
    totalCart.innerText= "$0 MXN"
  }
  
  const bookAutor = (input) => {
    fetch(consultaAutor + input + API_KEY)
      .then((response) => response.json())
      .then((data) => renderList(data,input));
  };

  const bookTitle = (input) => {
    fetch(consultaTitulo + input + API_KEY)
      .then((response) => response.json())
      .then((data) => renderList(data,input));
  };

  const bookISBN = (input) => {
    fetch(consultaISBN + input + API_KEY)
      .then((response) => response.json())
      .then((data) => renderList(data,input));
  };
  
  const obtenerRadioSeleccionado = () => {
  
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        return radioButtons[i].value;
      }
    }
  
    return null; // Si no se seleccionó ningún radio button
  }
  
 
document.getElementById("btnSearch").addEventListener("click", busquedaLibro);
  
document.getElementById("confirmarPedido").addEventListener("click", pedidoEnviado);