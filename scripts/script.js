/*Corregir CSS
  Corregir boton resta 1
  Agregar boton restar todo

  Agregue un formulario para usar LocalStorage y JSON
*/

//Variables declaradas
//Parametros de busqueda
let allContainerCart = document.querySelector(".products");
let containerBuyCart = document.querySelector(".card-items");
let priceTotal = document.querySelector(".price-total");
let amountProduct = document.querySelector(".count-product");
//Array
let buyThings = [];
let totalCard = 0;
let countProduct = 0;
//Functiones declaradas
loadEventListenrs();
function loadEventListenrs() {
  allContainerCart.addEventListener("click", addProduct);
  containerBuyCart.addEventListener("click", deleteProduct);
}
//Funcion del boton para agregar producto al carro
function addProduct(e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-add-cart")) {
    const selectProduct = e.target.parentElement;
    readTheContent(selectProduct);
  }
}
//Funcion quitar - Corregida restar 1
function deleteProduct(e) {
  if (e.target.classList.contains("delete-product")) {
    const deleteId = e.target.getAttribute("data-id");
    buyThings.forEach((value) => {
      if (value.id == deleteId) {
        // aquí se modifica la operación para poder separar las respondabilidades de cada elemento, dejando solo el precio
        let priceReduce = parseFloat(value.price);
        totalCard = totalCard - priceReduce;
        totalCard = totalCard.toFixed(3);
        // acá reducimos la cantidad de a uno por uno
        value.amount--;
        // acá la lógica para resolver cuando la resta de productos del mismo tipo lleguen a cero y se ṕuedan elminar totalmente del carrito
        if (value.amount === 0) {
          buyThings = buyThings.filter((product) => product.id !== deleteId);
          countProduct--;
        }
      }
    });
  }
  //Prueba contador
  if (buyThings.length === 0) {
    priceTotal.innerHTML = 0;
    amountProduct.innerHTML = 0;
  }
  loadHtml();
}
//FORMA ANTERIOR - RESTANDO TODO
// function deleteProduct(e) {
//   if (e.target.classList.contains("delete-product")) {
//     const deleteId = e.target.getAttribute("data-id");
//     buyThings.forEach((value) => {
//       if (value.id == deleteId) {
//         let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
//         totalCard = totalCard - priceReduce;
//         totalCard = totalCard.toFixed(3);
//       }
//     });
//     buyThings = buyThings.filter((product) => product.id !== deleteId);
//     countProduct--;
//   }
//   //Prueba contador
//   if (buyThings.length === 0) {
//     priceTotal.innerHTML = 0;
//     amountProduct.innerHTML = 0;
//   }
//   loadHtml();
// }

//Funcion para leer el contenido
function readTheContent(product) {
  const infoProduct = {
    image: product.querySelector("div img").src,
    title: product.querySelector(".title").textContent,
    price: product.querySelector("div p span").textContent,
    id: product.querySelector("a").getAttribute("data-id"),
    amount: 1,
  };
  //totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
  totalCard = parseInt(totalCard) + parseInt(infoProduct.price);
  totalCard = totalCard.toFixed(3);
  const exist = buyThings.some((product) => product.id === infoProduct.id);
  if (exist) {
    const pro = buyThings.map((product) => {
      if (product.id === infoProduct.id) {
        product.amount++;
        return product;
      } else {
        return product;
      }
    });
    buyThings = [...pro];
  } else {
    buyThings = [...buyThings, infoProduct];
    countProduct++;
  }
  loadHtml();
}
//Funcion para mostrar qué producto se agregó/Elimina Producto
function loadHtml() {
  clearHtml();
  buyThings.forEach((product) => {
    const { image, title, price, amount, id } = product;
    const row = document.createElement("div");
    row.classList.add("item");
    row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">$${price}</h5>
                <h6>Cantidad:${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
    containerBuyCart.appendChild(row);
    priceTotal.innerHTML = totalCard;
    amountProduct.innerHTML = countProduct;
  });
}
function clearHtml() {
  containerBuyCart.innerHTML = "";
}
//Aplicando LocalStorage
class Mensaje {
  constructor(nombreApellido, email, telf, mensajetext) {
    (this.nombreApellido = nombreApellido),
      (this.email = email),
      (this.telf = telf),
      (this.mensajetext = mensajetext);
  }
}
let form = document.getElementById("register");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //Obteniendo Elementos
  let nombreApellido = document.getElementById("nombreApellido").value;
  let correo = document.getElementById("correo").value;
  let telf = document.getElementById("telf").value;
  let mensajetext = document.getElementById("mensajetext").value;
  //Creando objetos para almacenar
  let mensaje = new Mensaje(nombreApellido, correo, telf, mensajetext);
  //Aplicando JSON
  localStorage.setItem("mensaje", JSON.stringify(mensaje));
  //Enviar Información
  document.getElementById("nombreApellido").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("telf").value = "";
  document.getElementById("mensajetext").value = "";
  enviarMensaje();
});
//Resultado
// const enviarMensaje = () => {
//   let card = document.getElementById("card");
//   let mensajes = JSON.parse(localStorage.getItem("mensaje"));
//   card.innerHTML = `<h4>Estimado: "${mensajes.nombreApellido}" se ha enviado su mensaje</h4>`;
// };

//Resultado
const enviarMensaje = () => {
  let card = document.getElementById("contenido_popup");
  let mensajes = JSON.parse(localStorage.getItem("mensaje"));
  document.querySelector(".popup").style.display = "block";
  card.innerHTML = `<h4>Estimado: "${mensajes.nombreApellido}" se ha enviado su mensaje</h4>`;
};
